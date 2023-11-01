import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useNewRef } from '../utils/useNewRef';

export type MediaDeviceType = 'video' | 'audio';

export type MediaDevicesOptions = MediaStreamConstraints & {
  ref?: RefObject<HTMLVideoElement> | null;
  startOnMount?: boolean;
};

export const useMediaDevices = (options: MediaDevicesOptions = {}) => {
  const { ref, startOnMount = true, ...globalConstraints } = options;

  const videoRef = useNewRef<HTMLVideoElement>(options.ref);
  const streamRef = useRef<MediaStream>(new MediaStream());
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [error, setError] = useState<Record<MediaDeviceType, unknown>>();

  const initializeStream = useCallback(() => {
    if (!videoRef.current) return;
    if (!streamRef.current.getTracks().length) return;

    videoRef.current.muted = true;
    videoRef.current.autoplay = true;
    videoRef.current.controls = false;
    videoRef.current.srcObject = streamRef.current;
  }, [ref]);

  const initMediaDevice = useCallback(
    async (type: MediaDeviceType, constraints: MediaStreamConstraints) => {
      const isVideo = type === 'video';
      const tracksGetterName = isVideo ? 'getVideoTracks' : 'getAudioTracks';

      // stop the current stream tracks so that the next tracks will start
      streamRef.current[tracksGetterName]().forEach(t => t.stop());

      setError(undefined);
      const excluded = isVideo ? 'audio' : 'video';
      const { [type]: trackConstraints, [excluded]: _, ...otherProps } = constraints;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          [type]: trackConstraints,
          ...otherProps
        });

        const tracks = stream[tracksGetterName]();
        const otherTracks = streamRef.current.getTracks().filter(t => t.kind === type);

        streamRef.current = new MediaStream([...tracks, ...otherTracks]);
        initializeStream();

        return true;
      } catch (error) {
        setError(err => ({ [type]: error, [excluded]: err && err[excluded] }) as any);
        return false;
      }
    },
    []
  );

  const start = useCallback(async (constraints?: MediaStreamConstraints) => {
    const mediaConstraints = constraints ?? globalConstraints;

    const { video, audio } = mediaConstraints;
    const cameraIsStarted = !!video && (await initMediaDevice('video', mediaConstraints));
    const microphoneIsStarted = !!audio && (await initMediaDevice('audio', mediaConstraints));

    return cameraIsStarted || microphoneIsStarted;
  }, []);

  const stop = useCallback(() => {
    if (videoRef.current) videoRef.current.srcObject = null;
    streamRef.current.getTracks().forEach(t => t.stop());
  }, []);

  const updateMediaDevices = useCallback(async () => {
    setDevices(await navigator.mediaDevices.enumerateDevices());
  }, []);

  useEffect(() => {
    if (startOnMount) start();
    updateMediaDevices();

    navigator.mediaDevices.addEventListener('devicechange', updateMediaDevices);
    return () => navigator.mediaDevices.removeEventListener('devicechange', updateMediaDevices);
  }, []);

  return { ref: videoRef, stream: streamRef, devices, start, stop, error };
};
