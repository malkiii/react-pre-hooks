import { useCallback, useEffect, useState } from 'react';
import { WithRef } from '@/src/types';
import { useEventListener } from '@/src';

type Options<T> = WithRef<Partial<{ horizontal: boolean; offset: number }>, T>;

export const useScrollEnd = <T extends HTMLElement>(options?: Options<T>) => {
  const target = options?.ref?.current;
  const [isScrollEnd, setIsScrollEnd] = useState<boolean>(false);

  const handleScrolling = useCallback(() => {
    const scrollX = target?.scrollLeft || window.scrollX;
    const scrollY = target?.scrollTop || window.scrollY;

    const { clientWidth, clientHeight, scrollWidth, scrollHeight } = target || document.body;
    const offset = options?.offset || 5;

    const isCloseToEnd = options?.horizontal
      ? scrollX + clientWidth >= scrollWidth - offset
      : scrollY + clientHeight >= scrollHeight - offset;

    setIsScrollEnd(isCloseToEnd);
  }, [options]);

  useEventListener('scroll', handleScrolling, { target });
  useEffect(handleScrolling, [scrollX, scrollY]);

  return isScrollEnd;
};
