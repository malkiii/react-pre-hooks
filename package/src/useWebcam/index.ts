import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { download } from '@/src/utils';

export type WebcamOptions = MediaTrackConstraints & {
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

export type WebcamRecorderOptions = Partial<{
  download: string;
  format: 'mp4' | 'webm';
}>;

export const useWebcam = (options: WebcamOptions = {}) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(!options.audio);
  const [error, setError] = useState<unknown>();

  const streamRef = useRef<MediaStream>();

  const [devices, setDevices] = useState<Record<'video' | 'audio', MediaDeviceInfo[]>>({
    video: [],
    audio: []
  });
  const [currentDevices, setCurrentDevices] = useState<{
    [K in keyof typeof devices]?: (typeof devices)[K][number];
  }>({
    video: undefined,
    audio: undefined
  });

  const { audio, autoStart = true, onStreaming, ...constraints } = options;

  const setDeviceNumber = useCallback(
    (indexes: Record<keyof typeof devices, number>) => {
      const videoDevice = devices.video[indexes.video] ?? currentDevices.video;
      const audioDevice = audio ? devices.audio[indexes.audio] ?? currentDevices.audio : undefined;

      setCurrentDevices({ video: videoDevice, audio: audioDevice });
    },
    [devices]
  );

  const getInputDevices = useCallback(async () => {
    const inputDevices = await navigator.mediaDevices.enumerateDevices();

    const videoDevices = inputDevices.filter(d => d.deviceId && d.kind === 'videoinput');
    const audioDevices = inputDevices.filter(d => d.deviceId && d.kind === 'audioinput');

    setDevices({ video: videoDevices, audio: audioDevices });
    setCurrentDevices({ video: videoDevices[0], audio: audioDevices[0] });
  }, []);

  const start = useCallback(async () => {
    const webcam = ref.current!;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: !isMuted && { deviceId: currentDevices.audio?.deviceId },
        video: { ...constraints, deviceId: currentDevices.video?.deviceId }
      });

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
  }, [ref, options, isMuted, currentDevices]);

  const stop = useCallback(() => {
    const webcam = ref.current;
    if (webcam) webcam.srcObject = null;
    setIsStarted(false);
  }, [ref]);

  const mute = useCallback(
    (force: boolean = true) => {
      if (!streamRef.current) return;
      streamRef.current.getAudioTracks()[0].enabled = !force;
      setIsMuted(force);
    },
    [streamRef]
  );

  const takeScreenshot = useCallback(
    (options: WebcamScreenshotOptions = {}) => {
      const webcam = ref.current;
      const screenshotCanvas = document.createElement('canvas');
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

      screenshotCanvas.width = width;
      screenshotCanvas.height = height;

      const context = screenshotCanvas.getContext('2d');
      context?.drawImage(webcam, 0, 0, width, height);

      const type = `image/${options.format || 'png'}`;
      const screenshot = screenshotCanvas.toDataURL(type, options.quality);
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

        recorderRef.current.start(1000);
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

  useLayoutEffect(() => {
    getInputDevices();
  }, []);

  useLayoutEffect(() => {
    if (!currentDevices.video) return;
    streamRef.current?.getTracks().forEach(track => track.stop());

    if (ref.current && autoStart) start();
  }, [ref, currentDevices]);

  return {
    ref,
    devices,
    currentDevices,
    isStarted,
    isMuted,
    start,
    stop,
    setDeviceNumber,
    takeScreenshot,
    mute,
    recorder,
    error
  };
};
