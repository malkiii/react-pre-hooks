import { useCallback, useEffect, useState } from 'react';
import { useOrCreateRef, useScroll } from '.';
import { WithRef } from './types';

type Options = WithRef<Partial<{ horizontal: boolean; offset: number }>>;

export const useScrollEnd = ({ horizontal = false, offset = 0, ref }: Options) => {
  const targetRef = useOrCreateRef(ref || document.body);

  const { scrollX, scrollY } = useScroll(targetRef);
  const [isScrollEnd, setIsScrollEnd] = useState<boolean>(false);

  const handleScrolling = useCallback(() => {
    if (!targetRef.current) return;

    const { clientWidth, clientHeight, scrollWidth, scrollHeight } = targetRef.current;

    const isCloseToEnd = horizontal
      ? scrollX + clientWidth >= scrollWidth - offset
      : scrollY + clientHeight >= scrollHeight - offset;

    setIsScrollEnd(isCloseToEnd);
  }, [targetRef]);

  useEffect(handleScrolling, [scrollX, scrollY]);

  return isScrollEnd;
};
