import { useCallback, useState } from 'react';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useScreenCapture | useScreenCapture} hook.
 */
export const useScreenCapture = (options: DisplayMediaStreamOptions = {}) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isPending, setIsPending] = useState(false);

  const startStreaming = useCallback(async () => {
    setIsPending(true);
    stream?.getTracks().forEach(t => t.stop());

    try {
      const newStream = await navigator.mediaDevices.getDisplayMedia(options);
      const videoTrack = newStream.getVideoTracks()[0];
      if (videoTrack) videoTrack.onended = () => setStream(null);

      setStream(newStream);
      setIsPending(false);

      return newStream;
    } finally {
      setIsPending(false);
    }
  }, [stream]);

  const stopStreaming = useCallback(() => {
    stream?.getTracks().forEach(t => t.stop());
    setStream(null);
  }, [stream]);

  return { stream, start: startStreaming, stop: stopStreaming, isPending };
};
