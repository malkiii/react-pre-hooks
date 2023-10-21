import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { addEvents } from '../utils';

export type ScrollEndOptions<T extends HTMLElement> = {
  ref?: RefObject<T> | null;
  offset?: number;
  horizontal?: boolean;
};

export const useScrollEnd = <T extends HTMLElement = HTMLDivElement>(
  handler: (isScrollEnd: boolean) => any,
  options: ScrollEndOptions<T> = {}
) => {
  const targetRef = options.ref ?? useRef<T>(null);
  const [isScrollEnd, setIsScrollEnd] = useState<boolean>(false);

  const handleScrolling = useCallback(() => {
    const x = targetRef.current?.scrollLeft ?? window.scrollX;
    const y = targetRef.current?.scrollTop ?? window.scrollY;

    const target = targetRef.current || document.body;
    const { clientWidth, clientHeight, scrollWidth, scrollHeight } = target;

    const offset = options.offset || 5;
    const isCloseToEnd = options.horizontal
      ? x + clientWidth >= scrollWidth - offset
      : y + clientHeight >= scrollHeight - offset;

    setIsScrollEnd(isCloseToEnd);
  }, [handler]);

  useEffect(() => {
    handler(isScrollEnd);
  }, [isScrollEnd]);

  useEffect(() => {
    handleScrolling();
    return addEvents('scroll', handleScrolling, { ref: targetRef.current ?? window });
  }, [options.ref]);

  return targetRef;
};
