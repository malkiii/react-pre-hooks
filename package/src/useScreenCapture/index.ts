import { RefObject, useMemo, useRef, useState } from 'react';
import { useNewRef } from '../utils/useNewRef';

export type ScreenCaptureOptions = MediaStreamConstraints & {
  ref?: RefObject<HTMLVideoElement> | null;
};

export const useScreenCapture = (options: ScreenCaptureOptions = {}) => {
  const { ref, ...constraints } = options;

  const streamRef = useRef<MediaStream>();
  const videoRef = useNewRef<HTMLVideoElement>(options.ref);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  const controls = useMemo(
    () => ({
      async start() {
        streamRef.current?.getTracks().forEach(t => t.stop());
        setError(undefined);

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
      },
      stop() {
        if (videoRef.current) videoRef.current.srcObject = null;
        streamRef.current?.getTracks().forEach(t => t.stop());
        setIsStarted(false);
      },
      async toggle(start?: boolean) {
        const shouldStart = start ?? !isStarted;
        shouldStart ? await this.start() : this.stop();
      }
    }),
    [isStarted]
  );

  return { ref: videoRef, ...controls, stream: streamRef, isStarted, error };
};
