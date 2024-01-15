import { RefObject, useMemo, useRef, useState } from 'react';
import { useNewRef } from '../utils/useNewRef';

export type ScreenCaptureOptions = MediaStreamConstraints & {
  ref?: RefObject<HTMLVideoElement> | null;
};

export const useScreenCapture = (options: ScreenCaptureOptions = {}) => {
  const { ref, ...constraints } = options;

  const streamRef = useRef<MediaStream>();
  const videoRef = useNewRef<HTMLVideoElement>(options.ref);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  const controls = useMemo(
    () => ({
      async start() {
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
      },
      stop() {
        if (videoRef.current) videoRef.current.srcObject = null;
        streamRef.current?.getTracks().forEach(t => t.stop());
        setIsEnabled(false);
      },
      async toggle(start?: boolean) {
        const shouldStart = start ?? !isEnabled;
        shouldStart ? await this.start() : this.stop();
      }
    }),
    [isEnabled]
  );

  return { ref: videoRef, ...controls, stream: streamRef, isEnabled, error };
};
