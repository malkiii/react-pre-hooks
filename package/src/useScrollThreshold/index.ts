import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { addEvents } from '../utils';

export type ScrollThresholdOptions<T extends HTMLElement> = {
  ref?: RefObject<T> | null;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export const useScrollThreshold = <T extends HTMLElement = HTMLDivElement>(
  options: ScrollThresholdOptions<T> = {}
) => {
  const { ref, ...offset } = options;

  const targetRef = ref ?? useRef<T>(null);
  const [passed, setPassed] = useState<boolean>(false);

  const handleScrolling = useCallback(() => {
    const x = targetRef.current?.scrollLeft ?? window.scrollX;
    const y = targetRef.current?.scrollTop ?? window.scrollY;

    const target = targetRef.current ?? document.body;
    const { top = 0, bottom = 3, left = 0, right = 3 } = offset;
    const { clientWidth, clientHeight, scrollWidth, scrollHeight } = target;

    const passedLeft = x >= left;
    const passedRight = x + clientWidth >= scrollWidth - right;

    const passedTop = y >= top;
    const passedBottom = y + clientHeight >= scrollHeight - bottom;

    setPassed(passedLeft && passedRight && passedTop && passedBottom);
  }, []);

  useEffect(() => {
    handleScrolling();
    return addEvents('scroll', handleScrolling, { ref: targetRef.current ?? window });
  }, [ref]);

  return { ref: targetRef, passed };
};
