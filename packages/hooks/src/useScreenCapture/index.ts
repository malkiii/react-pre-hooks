import { RefObject, useCallback, useRef, useState } from 'react';
import { useNewRef } from '../utils/useNewRef';

export type ScreenCaptureOptions = MediaStreamConstraints & {
  ref?: RefObject<HTMLVideoElement> | null;
};

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useScreenCapture | useScreenCapture} hook.
 */
export const useScreenCapture = (options: ScreenCaptureOptions = {}) => {
  const { ref, ...constraints } = options;

  const streamRef = useRef<MediaStream>();
  const videoRef = useNewRef<HTMLVideoElement>(options.ref);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  const start = useCallback(async () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    setError(undefined);

    try {
      streamRef.current = await navigator.mediaDevices.getDisplayMedia(constraints);
      const videoTrack = streamRef.current.getVideoTracks().at(0);
      if (videoTrack) videoTrack.onended = () => setIsEnabled(false);

      setIsEnabled(true);
    } catch (error) {
      setError(error);
      setIsEnabled(false);
      streamRef.current = undefined;
    }
  }, []);

  const stop = useCallback(() => {
    if (videoRef.current) videoRef.current.srcObject = null;
    streamRef.current?.getTracks().forEach(t => t.stop());
    setIsEnabled(false);
  }, []);

  const toggle = useCallback(
    async (force?: boolean) => {
      const shouldStart = force ?? !isEnabled;
      shouldStart ? await start() : stop();
    },
    [isEnabled]
  );

  return { ref: videoRef, streamRef, start, stop, toggle, isEnabled, error };
};
