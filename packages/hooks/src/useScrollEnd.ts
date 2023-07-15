import { useCallback, useEffect, useRef, useState } from 'react';
import { WithRef } from './types';
import { useScroll } from './useScroll';

type Options = WithRef<Partial<{ horizontal: boolean; offset: number }>>;

export const useScrollEnd = ({ horizontal = false, offset = 0, ref }: Options) => {
  const targetRef = ref || useRef(document.body);

  const { scrollX, scrollY } = useScroll(targetRef);
  const [isScrollEnd, setIsScrollEnd] = useState<boolean>(false);

  const handleScrolling = useCallback(() => {
    if (ref && !ref.current) return;

    const { clientWidth, clientHeight, scrollWidth, scrollHeight } = targetRef.current!;

    const isCloseToEnd = horizontal
      ? scrollX + clientWidth >= scrollWidth - offset
      : scrollY + clientHeight >= scrollHeight - offset;

    setIsScrollEnd(isCloseToEnd);
  }, [targetRef]);

  useEffect(handleScrolling, [scrollX, scrollY]);

  return isScrollEnd;
};
