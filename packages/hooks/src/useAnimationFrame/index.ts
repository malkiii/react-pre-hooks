import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useAnimationFrame | useAnimationFrame} hook.
 */
export const useAnimationFrame = (args: {
  callback: FrameRequestCallback;
  startOnMount?: boolean;
}) => {
  const frameRequestId = useRef<number>();
  const [isStarted, setIsStarted] = useState<boolean>(!!args.startOnMount);

  const handleAnimationFrameRequest: FrameRequestCallback = useCallback(
    timestamp => {
      args.callback(timestamp);
      frameRequestId.current = window.requestAnimationFrame(handleAnimationFrameRequest);
    },
    [args.callback]
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
    if (args.startOnMount) startAnimationFrame();
  }, []);

  return { start: startAnimationFrame, cancel: stopAnimationFrame, toggle, isStarted };
};
