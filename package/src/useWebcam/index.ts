import { SetStateAction, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { download } from '@/src/utils';

export type MediaDevice = {
  available: MediaDeviceInfo[];
  current?: MediaDeviceInfo;
  isEnabled: boolean;
  use: (deviceIndex: number) => void;
  enable: (force?: SetStateAction<boolean>) => void;
};

export type WebcamRecorderOptions = Partial<{
  download: string;
  format: 'mp4' | 'webm';
}>;

export type WebcamOptions = MediaTrackConstraints & {
  video?: boolean;
  audio?: boolean;
  autoStart?: boolean;
  onStreaming?: (stream: MediaStream) => void;
};

export type WebcamScreenshotOptions = Partial<{
  width: number;
  height: number;
  quality: number;
  download: string;
  format: 'png' | 'jpeg' | 'webp';
}>;

export const useWebcam = (options: WebcamOptions = {}) => {
  const ref = useRef<HTMLVideoElement>(null);
  const { video = true, audio = false, autoStart = true, onStreaming, ...constraints } = options;

  const streamRef = useRef<MediaStream>();
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();
  const [camera, setCamera] = useState<MediaDevice>({
    available: [],
    current: undefined,
    isEnabled: video,
    use: index => {
      const device = camera.available.at(index);
      if (device && device.kind == 'videoinput') setCamera(c => ({ ...c, current: device }));
    },
    enable: (force = true) => {
      if (!streamRef.current) return;
      setCamera(c => {
        const resolvedValue = force instanceof Function ? force(c.isEnabled) : force;
        streamRef.current!.getVideoTracks()[0].enabled = resolvedValue;
        return { ...c, isEnabled: resolvedValue };
      });
    }
  });
  const [microphone, setMicrophone] = useState<MediaDevice>({
    available: [],
    current: undefined,
    isEnabled: audio,
    use: index => {
      const device = camera.available.at(index);
      if (device && device.kind == 'audioinput') setMicrophone(m => ({ ...m, current: device }));
    },
    enable: (force = true) => {
      if (!streamRef.current) return;
      setMicrophone(m => {
        const resolvedValue = force instanceof Function ? force(m.isEnabled) : force;
        streamRef.current!.getAudioTracks()[0].enabled = resolvedValue;
        return { ...m, isEnabled: resolvedValue };
      });
    }
  });

  const start = useCallback(async () => {
    const webcam = ref.current!;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: microphone.current?.deviceId },
        video: { ...constraints, deviceId: camera.current?.deviceId }
      });

      stream.getVideoTracks()[0].enabled = camera.isEnabled;
      stream.getAudioTracks()[0].enabled = microphone.isEnabled;

      webcam.muted = true;
      webcam.controls = false;
      webcam.autoplay = true;
      webcam.srcObject = stream;

      streamRef.current = stream;
      if (onStreaming) onStreaming(stream);

      setIsStarted(true);
    } catch (error) {
      setError(error);
    }
  }, [ref, options, camera, microphone]);

  const stop = useCallback(() => {
    const webcam = ref.current;
    if (webcam) webcam.srcObject = null;
    setIsStarted(false);
  }, [ref]);

  const takeScreenshot = useCallback(
    (options: WebcamScreenshotOptions = {}) => {
      const webcam = ref.current;
      if (!webcam) return undefined;

      let width: number;
      let height: number;
      if (!options.width && !options.height) {
        width = webcam.offsetWidth;
        height = webcam.offsetHeight;
      } else {
        const aspectRatio = webcam.offsetWidth / webcam.offsetHeight;
        width = options.width ?? aspectRatio * options.height!;
        height = options.height ?? options.width! / aspectRatio;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d')?.drawImage(webcam, 0, 0, width, height);

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

        recorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm' });
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
      async stop(options: WebcamRecorderOptions = {}) {
        if (recorderState == 'inactive') return;
        recorderRef.current?.stop();

        const blob = await new Promise<Blob>(resolve => {
          const type = `video/${options.format || 'mp4'}`;
          setTimeout(() => resolve(new Blob(recorderBlobParts.current, { type })), 0);
        });

        const videoURL = URL.createObjectURL(blob);
        recorderBlobParts.current = [];

        if (options.download) download(videoURL, options.download);

        return videoURL;
      },
      pause() {
        if (recorderState == 'inactive') return;
        recorderRef.current?.pause();
      },
      resume() {
        if (recorderState == 'inactive') return;
        recorderRef.current?.resume();
      }
    }),
    [recorderRef, recorderState]
  );

  const getInputDevices = useCallback(async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();

    const videoDevices = devices.filter(d => d.deviceId && d.kind === 'videoinput');
    const audioDevices = devices.filter(d => d.deviceId && d.kind === 'audioinput');

    setCamera(c => ({ ...c, available: videoDevices, current: videoDevices[0] }));
    setMicrophone(m => ({ ...m, available: audioDevices, current: audioDevices[0] }));
  }, []);

  useLayoutEffect(() => {
    getInputDevices();
  }, []);

  useLayoutEffect(() => {
    if (!camera.current || !microphone.current) return;
    streamRef.current?.getTracks().forEach(track => track.stop());

    if (ref.current && autoStart) start();
  }, [ref, camera.current, microphone.current]);

  return {
    ref,
    camera,
    microphone,
    isStarted,
    start,
    stop,
    takeScreenshot,
    recorder,
    error
  };
};
