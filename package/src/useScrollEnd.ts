import { useCallback, useEffect, useRef, useState } from 'react';
import { useEventListener } from '@/src';

export type ScrollEndOptions<T extends HTMLElement> = {
  target?: T | null;
  offset?: number;
  horizontal?: boolean;
};

export const useScrollEnd = <T extends HTMLElement = HTMLDivElement>(
  handler: () => any,
  options: ScrollEndOptions<T> = {}
) => {
  const ref = useRef<T>(options.target ?? null);
  const [isScrollEnd, setIsScrollEnd] = useState<boolean>(false);

  const handleScrolling = useCallback(() => {
    const scrollX = ref.current?.scrollLeft || window.scrollX;
    const scrollY = ref.current?.scrollTop || window.scrollY;

    const target = ref.current || document.body;
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

  useEffect(handleScrolling, []);
  useEventListener('scroll', handleScrolling, { target: ref.current ?? window });

  return ref;
};
