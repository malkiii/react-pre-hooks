import { SetStateAction, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { download, getStateActionValue } from '@/src/utils';

export type MediaDevice = {
  available: MediaDeviceInfo[];
  current?: MediaDeviceInfo;
  isEnabled: boolean;
  use: (device?: SetStateAction<MediaDeviceInfo | undefined>) => void;
  enable: (force?: SetStateAction<boolean>) => void;
};

export type RecorderOptions = Partial<{
  download: string;
  type:
    | `video/${'mp4' | 'mpeg' | 'webm' | 'ogg'}`
    | `audio/${'mpeg' | 'wav' | 'webm' | 'ogg'}`
    | (string & {});
}>;

export type StreamOptions = Partial<{
  video: boolean | (MediaTrackConstraints & { display?: boolean });
  audio: boolean | MediaTrackConstraints;
  autoStart: boolean;
  onStart: (stream: MediaStream) => void;
}>;

export type ScreenshotOptions = Partial<{
  width: number;
  height: number;
  quality: number;
  download: string;
  format: 'png' | 'jpeg' | 'webp';
}>;

export const useWebRTC = (options: StreamOptions = {}) => {
  const ref = useRef<HTMLVideoElement>(null);
  const { autoStart = true, onStart } = options;
  const { video = false, audio = false } = options;

  const videoConstraints = typeof video == 'boolean' ? {} : video;
  const audioConstraints = typeof audio == 'boolean' ? {} : audio;

  const streamRef = useRef<MediaStream>(new MediaStream());
  const [shouldStart, setShouldStart] = useState<boolean>(false);
  const [notAllowedDevices, setNotAllowedDevices] = useState<Array<'video' | 'audio'>>([]);

  const [camera, setCamera] = useState<MediaDevice>({
    available: [],
    isEnabled: !!video,
    use: value => {
      setCamera(c => {
        const device = getStateActionValue(value, c.current);
        if (device && device.kind !== 'videoinput') return c;
        return { ...c, current: device };
      });
    },
    enable: (force = true) => {
      setCamera(c => {
        const resolvedValue = getStateActionValue(force, c.isEnabled);
        streamRef.current.getVideoTracks()[0].enabled = resolvedValue;
        return { ...c, isEnabled: resolvedValue };
      });
    }
  });

  const [microphone, setMicrophone] = useState<MediaDevice>({
    available: [],
    isEnabled: !!audio,
    use: value => {
      setMicrophone(m => {
        const device = getStateActionValue(value, m.current);
        if (device && device.kind !== 'audioinput') return m;
        return { ...m, current: device };
      });
    },
    enable: (force = true) => {
      setMicrophone(m => {
        const resolvedValue = getStateActionValue(force, m.isEnabled);
        streamRef.current.getAudioTracks()[0].enabled = resolvedValue;
        return { ...m, isEnabled: resolvedValue };
      });
    }
  });

  const start = useCallback(() => {
    const media = ref.current;
    if (!media) return;
    const stream = streamRef.current;
    if (!stream.getTracks().length) return;

    media.muted = true;
    media.controls = false;
    media.autoplay = true;
    media.srcObject = stream;

    if (onStart) onStart(stream);
  }, [shouldStart, camera.current, microphone.current]);

  const stop = useCallback(() => {
    if (ref.current) ref.current.srcObject = null;
    setShouldStart(false);
  }, [ref]);

  const takeScreenshot = useCallback(
    (options: ScreenshotOptions = {}) => {
      const media = ref.current;
      if (!media) return undefined;

      let width: number;
      let height: number;
      if (!options.width && !options.height) {
        width = media.offsetWidth;
        height = media.offsetHeight;
      } else {
        const aspectRatio = media.offsetWidth / media.offsetHeight;
        width = options.width ?? aspectRatio * options.height!;
        height = options.height ?? options.width! / aspectRatio;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d')?.drawImage(media, 0, 0, width, height);

      const type = `image/${options.format || 'png'}`;
      const screenshot = canvas.toDataURL(type, options.quality);
      if (options.download) download(screenshot, options.download);

      return screenshot;
    },
    [ref]
  );

  const recorderRef = useRef<MediaRecorder>();
  const recorderBlobParts = useRef<BlobPart[]>([]);
  const [recorderState, setRecorderState] = useState<RecordingState>('inactive');

  const recorder = useMemo(
    () => ({
      isActive: recorderState !== 'inactive',
      isRecording: recorderState == 'recording',
      isPaused: recorderState == 'paused',
      start() {
        if (recorderState !== 'inactive') return;
        const stream = streamRef.current;
        if (!stream) return;

        recorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9,opus' });
        recorderRef.current.ondataavailable = event => {
          if (event.data.size > 0) recorderBlobParts.current.push(event.data);
        };

        const stateEvents = ['onstart', 'onstop', 'onpause', 'onresume'] as const;
        const updateRecorderState = () => setRecorderState(recorderRef.current!.state);
        stateEvents.forEach(event => {
          recorderRef.current![event] = updateRecorderState;
        });

        recorderRef.current.start();
      },
      async stop(options: RecorderOptions = {}) {
        if (recorderState == 'inactive') return;
        recorderRef.current?.resume();
        recorderRef.current?.stop();

        const blob = await new Promise<Blob>(resolve => {
          const type = options.type ?? 'video/mp4';
          setTimeout(() => resolve(new Blob(recorderBlobParts.current, { type })), 0);
        });

        const videoURL = URL.createObjectURL(blob);
        recorderBlobParts.current = [];

        if (options.download) download(videoURL, options.download);

        return videoURL;
      },
      toggle(play?: boolean) {
        if (recorderState == 'inactive') return;
        const shouldPlay = play ?? recorderState == 'paused';
        shouldPlay ? recorderRef.current?.resume() : recorderRef.current?.pause();
      },
      pause() {
        this.toggle(false);
      },
      resume() {
        this.toggle(true);
      }
    }),
    [recorderRef, recorderState]
  );

  const getInputDevices = useCallback(async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();

    if (!videoConstraints.display) {
      const videoDevices = devices.filter(d => d.deviceId && d.kind === 'videoinput');
      setCamera(c => ({ ...c, available: videoDevices, current: videoDevices[0] }));
    }

    const audioDevices = devices.filter(d => d.deviceId && d.kind === 'audioinput');
    setMicrophone(m => ({ ...m, available: audioDevices, current: audioDevices[0] }));

    setShouldStart(autoStart);
  }, []);

  useLayoutEffect(() => {
    getInputDevices();
  }, []);

  useLayoutEffect(() => {
    if (videoConstraints.display) return;
    streamRef.current.getVideoTracks().forEach(t => t.stop());
    if (!shouldStart || !camera.current) return;

    (async () => {
      videoConstraints.deviceId = camera.current?.deviceId;
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({
          video: videoConstraints
        });

        const tracks = videoStream.getVideoTracks();
        tracks[0].enabled = camera.isEnabled;
        tracks.forEach(track => {
          track.contentHint = 'camera';
        });

        streamRef.current = new MediaStream([...streamRef.current.getAudioTracks(), ...tracks]);
        setNotAllowedDevices(d => d.filter(e => e !== 'video'));
        start();
      } catch (error) {
        setNotAllowedDevices(d => [...d, 'video']);
      }
    })();
  }, [camera.current, shouldStart]);

  useLayoutEffect(() => {
    if (!videoConstraints.display) return;
    if (!shouldStart || !camera.isEnabled) return;
    (async () => {
      videoConstraints.deviceId = camera.current?.deviceId;
      try {
        const screenCaptureStream = await navigator.mediaDevices.getDisplayMedia({
          video: videoConstraints,
          audio: true
        });

        const tracks = screenCaptureStream.getTracks();
        tracks.forEach(track => {
          track.contentHint = 'screen';
        });

        streamRef.current = new MediaStream([...streamRef.current.getAudioTracks(), ...tracks]);
        setNotAllowedDevices(d => d.filter(e => e !== 'video'));
        start();
      } catch (error) {
        setNotAllowedDevices(d => [...d, 'video']);
      }
    })();
  }, [camera.isEnabled, shouldStart]);

  useLayoutEffect(() => {
    streamRef.current.getAudioTracks().forEach(t => t.stop());
    if (!microphone.current || !shouldStart) return;
    (async () => {
      audioConstraints.deviceId = microphone.current?.deviceId;
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: audioConstraints
        });

        const tracks = audioStream.getAudioTracks();
        tracks[0].enabled = microphone.isEnabled;
        tracks.forEach(track => {
          track.contentHint = 'microphone';
        });

        const currentTracks = streamRef.current
          .getTracks()
          .filter(t => t.contentHint !== 'microphone');

        streamRef.current = new MediaStream([...currentTracks, ...tracks]);
        setNotAllowedDevices(d => d.filter(e => e !== 'audio'));
        start();
      } catch (error) {
        setNotAllowedDevices(d => [...d, 'audio']);
      }
    })();
  }, [microphone.current, shouldStart]);

  return {
    ref,
    devices: { video: camera, audio: microphone },
    start: () => setShouldStart(true),
    stop,
    takeScreenshot,
    recorder,
    notAllowedDevices
  };
};
