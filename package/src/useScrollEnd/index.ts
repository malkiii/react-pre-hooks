import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { addEvents } from '@/src/utils';

export type ScrollEndOptions<T extends HTMLElement> = {
  ref?: RefObject<T> | null;
  offset?: number;
  horizontal?: boolean;
};

export const useScrollEnd = <T extends HTMLElement = HTMLDivElement>(
  handler: () => any,
  options: ScrollEndOptions<T> = {}
) => {
  const targetRef = options.ref ?? useRef<T>(null);
  const [isScrollEnd, setIsScrollEnd] = useState<boolean>(false);

  const handleScrolling = useCallback(() => {
    const scrollX = targetRef.current?.scrollLeft || window.scrollX;
    const scrollY = targetRef.current?.scrollTop || window.scrollY;

    const target = targetRef.current || document.body;
    const { clientWidth, clientHeight, scrollWidth, scrollHeight } = target;

    const offset = options.offset || 5;
    const isCloseToEnd = options.horizontal
      ? scrollX + clientWidth >= scrollWidth - offset
      : scrollY + clientHeight >= scrollHeight - offset;

    setIsScrollEnd(isCloseToEnd);
  }, [handler]);

  useEffect(() => {
    if (isScrollEnd) handler();
  }, [isScrollEnd]);

  useEffect(() => {
    handleScrolling();
    return addEvents('scroll', handleScrolling, {
      ref: targetRef.current ?? window
    });
  }, [options.ref]);

  return targetRef;
};
