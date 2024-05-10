import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useMediaDevices | useMediaDevices} hook.
 */
export const useMediaDevices = (
  args: MediaStreamConstraints & {
    startOnMount?: boolean;
  } = {}
) => {
  const streamRef = useRef<MediaStream>();

  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [error, setError] = useState<unknown>();

  const stopStreaming = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
  }, []);

  const startStreaming = useCallback(async (constraints?: MediaStreamConstraints) => {
    // stop the current stream tracks so that the next tracks will start
    stopStreaming();

    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia(constraints ?? args);
    } catch (error) {
      setError(error);
    }
  }, []);

  const updateMediaDevices = useCallback(async () => {
    setDevices(await navigator.mediaDevices.enumerateDevices());
  }, []);

  useEffect(() => {
    if (args.startOnMount) startStreaming();
    updateMediaDevices();

    navigator.mediaDevices.addEventListener('devicechange', updateMediaDevices);
    return () => navigator.mediaDevices.removeEventListener('devicechange', updateMediaDevices);
  }, []);

  return { streamRef, devices, start: startStreaming, stop: stopStreaming, error };
};
