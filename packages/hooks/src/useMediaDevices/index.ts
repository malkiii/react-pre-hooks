import { useCallback, useEffect, useState } from 'react';

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

  const startStreaming = useCallback(
    async (constraints?: MediaStreamConstraints) => {
      const currentTracks = stream?.getTracks();

      // stop the current stream tracks so that the next tracks will start
      currentTracks?.forEach(t => t.stop());

      const newStream = await navigator.mediaDevices.getUserMedia(constraints ?? args);

      // disable the tracks that were enabled in the previous stream
      if (currentTracks) {
        for (const track of newStream.getTracks()) {
          const current = currentTracks.find(t => t.kind === track.kind);
          if (current) track.enabled = current.enabled;
        }
      }

      setStream(newStream);
    },
    [stream]
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

  return { stream, devices, start: startStreaming, stop: stopStreaming };
};
