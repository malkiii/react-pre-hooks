import { useCallback, useState } from 'react';
import { useEventListener } from '../useEventListener';
import { useNewRef } from '../utils/useNewRef';

export type ScrollThresholdHandler = (event?: Event) => boolean | undefined | null;
export type ScrollThresholdOffset = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useScrollThreshold | useScrollThreshold} hook.
 */
export const useScrollThreshold = <T extends HTMLElement = HTMLDivElement>(args: {
  threshold: ScrollThresholdOffset | ScrollThresholdHandler;
  ref?: React.RefObject<T> | null;
}) => {
  const targetRef = useNewRef<T>(args.ref);
  const [isPassed, setIsPassed] = useState<boolean>(false);

  const handleScrolling = useCallback(
    (event?: Event) => {
      if (args.threshold instanceof Function) return setIsPassed(!!args.threshold(event));

      const x = targetRef.current?.scrollLeft ?? window.scrollX;
      const y = targetRef.current?.scrollTop ?? window.scrollY;

      const target = targetRef.current ?? document.body;
      const { top = 0, bottom = 3, left = 0, right = 3 } = args.threshold;
      const { clientWidth, clientHeight, scrollWidth, scrollHeight } = target;

      const passedLeft = x >= left;
      const passedRight = x + clientWidth >= scrollWidth - right;

      const passedTop = y >= top;
      const passedBottom = y + clientHeight >= scrollHeight - bottom;

      setIsPassed(passedLeft && passedRight && passedTop && passedBottom);
    },
    [args.threshold]
  );

  useEventListener({
    event: 'scroll',
    handler: handleScrolling,
    target: () => {
      handleScrolling();
      return targetRef.current ?? window;
    }
  });

  return { ref: targetRef, isPassed };
};
