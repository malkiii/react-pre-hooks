import { useCallback, useRef, useState } from 'react';
import { WithRef } from '@/src/types';
import { useEventListener } from '@/src';

type Options<T> = WithRef<Partial<{ horizontal: boolean; offset: number }>, T>;

export const useScrollEnd = <T extends HTMLElement = HTMLDivElement>(options?: Options<T>) => {
  const targetRef = options?.ref || useRef<T>(null);
  const [isScrollEnd, setIsScrollEnd] = useState<boolean>(false);

  const handleScrolling = useCallback(() => {
    const scrollX = targetRef.current?.scrollLeft || window.scrollX;
    const scrollY = targetRef.current?.scrollTop || window.scrollY;

    const target = targetRef.current || document.body;
    const { clientWidth, clientHeight, scrollWidth, scrollHeight } = target;

    const offset = options?.offset || 5;
    const isCloseToEnd = options?.horizontal
      ? scrollX + clientWidth >= scrollWidth - offset
      : scrollY + clientHeight >= scrollHeight - offset;

    setIsScrollEnd(isCloseToEnd);
  }, [options]);

  useEventListener('scroll', handleScrolling, { target: targetRef.current || window });

  return { targetRef, isScrollEnd };
};