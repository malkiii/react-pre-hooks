import { RefObject, useCallback, useRef, useState } from 'react';

export type ScreenCaptureOptions = MediaStreamConstraints & {
  ref?: RefObject<HTMLVideoElement> | null;
};

export const useScreenCapture = (options: ScreenCaptureOptions = {}) => {
  const { ref, ...constraints } = options;

  const streamRef = useRef<MediaStream>();
  const videoRef = ref ?? useRef<HTMLVideoElement>(null);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  const start = useCallback(async () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    try {
      streamRef.current = await navigator.mediaDevices.getDisplayMedia(constraints);
      const videoTrack = streamRef.current.getVideoTracks().at(0);
      if (videoTrack) videoTrack.onended = () => setIsStarted(false);
      setIsStarted(true);

      return true;
    } catch (error) {
      setError(error);
      setIsStarted(false);

      return false;
    }
  }, []);

  const stop = useCallback(() => {
    if (videoRef.current) videoRef.current.srcObject = null;
    streamRef.current?.getTracks().forEach(t => t.stop());
    setIsStarted(false);
  }, []);

  return { ref: videoRef, stream: streamRef, isStarted, start, stop, error };
};
