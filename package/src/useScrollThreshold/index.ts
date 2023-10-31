import { RefObject, useCallback, useEffect, useState } from 'react';
import { addEvents } from '../utils';
import { useNewRef } from '../utils/useNewRef';

export type ScrollThresholdHandler = (event?: Event) => boolean | undefined | null;
export type ScrollThresholdOffset = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export const useScrollThreshold = <T extends HTMLElement = HTMLDivElement>(
  thresholdHandler: ScrollThresholdOffset | ScrollThresholdHandler,
  ref?: RefObject<T> | null
) => {
  const targetRef = useNewRef<T>(ref);
  const [passed, setPassed] = useState<boolean>(false);

  const handleScrolling = useCallback(
    (event?: Event) => {
      if (thresholdHandler instanceof Function) return setPassed(!!thresholdHandler(event));

      const x = targetRef.current?.scrollLeft ?? window.scrollX;
      const y = targetRef.current?.scrollTop ?? window.scrollY;

      const target = targetRef.current ?? document.body;
      const { top = 0, bottom = 3, left = 0, right = 3 } = thresholdHandler;
      const { clientWidth, clientHeight, scrollWidth, scrollHeight } = target;

      const passedLeft = x >= left;
      const passedRight = x + clientWidth >= scrollWidth - right;

      const passedTop = y >= top;
      const passedBottom = y + clientHeight >= scrollHeight - bottom;

      setPassed(passedLeft && passedRight && passedTop && passedBottom);
    },
    [thresholdHandler]
  );

  useEffect(() => {
    handleScrolling();
    return addEvents('scroll', handleScrolling, { target: targetRef.current ?? window });
  }, [thresholdHandler]);

  return { ref: targetRef, passed };
};
