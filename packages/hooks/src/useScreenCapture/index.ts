import { useCallback, useRef, useState } from 'react';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useScreenCapture | useScreenCapture} hook.
 */
export const useScreenCapture = (options: DisplayMediaStreamOptions = {}) => {
  const streamRef = useRef<MediaStream>();
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const startStreaming = useCallback(async () => {
    streamRef.current?.getTracks().forEach(t => t.stop());

    try {
      streamRef.current = await navigator.mediaDevices.getDisplayMedia(options);
      const videoTrack = streamRef.current.getVideoTracks().at(0);
      if (videoTrack) videoTrack.onended = () => setIsEnabled(false);

      setIsEnabled(true);
    } catch (error) {
      setIsEnabled(false);
      throw error;
    }
  }, []);

  const stopStreaming = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    setIsEnabled(false);
  }, []);

  const toggle = useCallback(
    async (force?: boolean) => {
      const shouldStart = force ?? !isEnabled;
      shouldStart ? await startStreaming() : stopStreaming();
    },
    [isEnabled]
  );

  return { streamRef, start: startStreaming, stop: stopStreaming, toggle, isEnabled };
};
