import { useCallback, useEffect, useRef, useState } from 'react';

export type AnimationFrameOptions = {
  startOnMount?: boolean;
};

export const useAnimationFrame = (
  callback: FrameRequestCallback,
  options: AnimationFrameOptions = {}
) => {
  const { startOnMount = false } = options;

  const frameRequestId = useRef<number>();
  const [isStarted, setIsStarted] = useState<boolean>(startOnMount);

  const handleAnimationFrameRequest: FrameRequestCallback = useCallback(
    timestamp => {
      callback(timestamp);
      frameRequestId.current = window.requestAnimationFrame(handleAnimationFrameRequest);
    },
    [callback]
  );

  const startAnimationFrame = useCallback(() => {
    setIsStarted(true);
    if (frameRequestId.current === undefined)
      frameRequestId.current = window.requestAnimationFrame(handleAnimationFrameRequest);
  }, []);

  const stopAnimationFrame = useCallback(() => {
    setIsStarted(false);
    if (frameRequestId.current !== undefined) window.cancelAnimationFrame(frameRequestId.current);
    frameRequestId.current = undefined;
  }, []);

  const toggle = useCallback(
    (start?: boolean) => {
      const shouldStart = start ?? !isStarted;
      shouldStart ? startAnimationFrame() : stopAnimationFrame();
    },
    [isStarted]
  );

  useEffect(() => {
    if (startOnMount) startAnimationFrame();
  }, []);

  return { start: startAnimationFrame, cancel: stopAnimationFrame, toggle, isStarted };
};
