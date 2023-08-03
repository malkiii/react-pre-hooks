import { useCallback, useEffect, useState } from 'react';
import { useScroll } from '.';
import { WithRef } from './types';

type Options<T> = WithRef<Partial<{ horizontal: boolean; offset: number }>, T>;

export const useScrollEnd = <T extends HTMLElement>(options?: Options<T>) => {
  const { ref: targetRef, scrollX, scrollY } = useScroll<T>(options?.ref);
  const [isScrollEnd, setIsScrollEnd] = useState<boolean>(false);

  const handleScrolling = useCallback(() => {
    if (!targetRef.current) return;

    const { clientWidth, clientHeight, scrollWidth, scrollHeight } = targetRef.current;
    const offset = options?.offset || 5;

    const isCloseToEnd = options?.horizontal
      ? scrollX + clientWidth >= scrollWidth - offset
      : scrollY + clientHeight >= scrollHeight - offset;

    setIsScrollEnd(isCloseToEnd);
  }, [targetRef]);

  useEffect(handleScrolling, [scrollX, scrollY]);

  return { ref: targetRef, isScrollEnd };
};
