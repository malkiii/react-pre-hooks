import { useCallback, useEffect, useRef, useState } from 'react';
import { useEventListener } from '@/src';

export const useScroll = <T extends HTMLElement = HTMLDivElement>(target: T | null = null) => {
  const ref = useRef<T>(target ?? null);
  const options = { target: ref.current ?? window };
  const initialValues = {
    x: 0,
    y: 0,
    progressX: 0,
    progressY: 0
  };

  const [isScrollDown, setIsScrollDown] = useState<boolean>();
  const [isScrollRight, setIsScrollRight] = useState<boolean>();

  const [scrollPosition, setScrollPosition] = useState(initialValues);
  const prevPosition = useRef<typeof scrollPosition>(initialValues);

  const handleScrolling = useCallback(() => {
    const x = ref.current?.scrollLeft || window.scrollX;
    const y = ref.current?.scrollTop || window.scrollY;

    const element = ref.current ?? document.body;

    const maxScrollX = element.scrollWidth - element.clientWidth;
    const maxScrollY = element.scrollHeight - element.clientHeight;
    const progressX = (element.scrollLeft / maxScrollX) * 100;
    const progressY = (element.scrollTop / maxScrollY) * 100;

    const distanceX = scrollX - prevPosition.current.x;
    const distanceY = scrollY - prevPosition.current.y;

    if (distanceX > 0) setIsScrollRight(true);
    else if (distanceX < 0) setIsScrollRight(false);

    if (distanceY > 0) setIsScrollDown(true);
    else if (distanceY < 0) setIsScrollDown(false);

    prevPosition.current = scrollPosition;
    setScrollPosition({ x, y, progressX, progressY });
  }, [scrollPosition]);

  useEffect(handleScrolling, []);
  useEventListener('scroll', handleScrolling, options);

  return { ref, ...scrollPosition, isScrollRight, isScrollDown };
};
