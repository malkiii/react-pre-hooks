import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useMediaDevices | useMediaDevices} hook.
 */
export const useMediaDevices = (
  args: MediaStreamConstraints & {
    startOnMount?: boolean;
  } = {}
) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  const stopStreaming = useCallback(() => {
    setStream(prev => {
      prev?.getTracks().forEach(t => t.stop());
      return null;
    });
  }, []);

  const startStreaming = useCallback(async (constraints?: MediaStreamConstraints) => {
    // stop the current stream tracks so that the next tracks will start
    stopStreaming();

    setStream(await navigator.mediaDevices.getUserMedia(constraints ?? args));
  }, []);

  const video = useMemo(
    () => ({
      devices: devices.filter(d => d.kind === 'videoinput'),
      isEnabled: stream?.getVideoTracks()[0]?.enabled
    }),
    [stream, devices]
  );

  const audio: typeof video = useMemo(
    () => ({
      devices: devices.filter(d => d.kind === 'audioinput'),
      isEnabled: stream?.getAudioTracks()[0]?.enabled
    }),
    [stream, devices]
  );

  const updateMediaDevices = useCallback(async () => {
    setDevices(await navigator.mediaDevices.enumerateDevices());
  }, []);

  useEffect(() => {
    if (args.startOnMount) startStreaming();
    updateMediaDevices();

    navigator.mediaDevices.addEventListener('devicechange', updateMediaDevices);
    return () => navigator.mediaDevices.removeEventListener('devicechange', updateMediaDevices);
  }, []);

  return { stream, video, audio, devices, start: startStreaming, stop: stopStreaming };
};
