import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useNewRef } from '../utils/useNewRef';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useMediaDevices | useMediaDevices} hook.
 */
export const useMediaDevices = (
  args: MediaStreamConstraints & {
    ref?: RefObject<HTMLVideoElement> | null;
    startOnMount?: boolean;
  } = {}
) => {
  const streamRef = useRef<MediaStream>();
  const videoRef = useNewRef<HTMLVideoElement>(args.ref);

  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [error, setError] = useState<unknown>();

  const start = useCallback(async (constraints?: MediaStreamConstraints) => {
    // stop the current stream tracks so that the next tracks will start
    streamRef.current?.getTracks().forEach(t => t.stop());

    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia(constraints ?? args);

      if (!videoRef.current) return;
      videoRef.current.muted = true;
      videoRef.current.autoplay = true;
      videoRef.current.srcObject = streamRef.current;
    } catch (error) {
      setError(error);
      streamRef.current = undefined;
    }
  }, []);

  const stop = useCallback(() => {
    if (videoRef.current) videoRef.current.srcObject = null;
    streamRef.current?.getTracks().forEach(t => t.stop());
  }, [videoRef]);

  const updateMediaDevices = useCallback(async () => {
    setDevices(await navigator.mediaDevices.enumerateDevices());
  }, []);

  useEffect(() => {
    if (args.startOnMount) start();
    updateMediaDevices();

    navigator.mediaDevices.addEventListener('devicechange', updateMediaDevices);
    return () => navigator.mediaDevices.removeEventListener('devicechange', updateMediaDevices);
  }, []);

  return { ref: videoRef, streamRef, devices, start, stop, error };
};
