import { useCallback, useEffect, useRef, useState } from 'react';
import { useEventListener } from '@/src';

export const useScroll = <T extends HTMLElement = HTMLDivElement>(target: T | null = null) => {
  const ref = useRef<T>(target ?? null);
  const options = { target: ref.current ?? window };
  const initialValues = {
    scrollX: 0,
    scrollY: 0,
    scrollProgressX: 0,
    scrollProgressY: 0
  };

  const [isScrollDown, setIsScrollDown] = useState<boolean>();
  const [isScrollRight, setIsScrollRight] = useState<boolean>();

  const [scrollPosition, setScrollPosition] = useState(initialValues);
  const prevPosition = useRef<typeof scrollPosition>(initialValues);

  const handleScrolling = useCallback(() => {
    const scrollX = ref.current?.scrollLeft || window.scrollX;
    const scrollY = ref.current?.scrollTop || window.scrollY;

    const element = ref.current ?? document.body;

    const maxScrollX = element.scrollWidth - element.clientWidth;
    const maxScrollY = element.scrollHeight - element.clientHeight;
    const scrollProgressX = (element.scrollLeft / maxScrollX) * 100;
    const scrollProgressY = (element.scrollTop / maxScrollY) * 100;

    const distanceX = scrollX - prevPosition.current.scrollX;
    const distanceY = scrollY - prevPosition.current.scrollY;

    if (distanceX > 0) setIsScrollRight(true);
    else if (distanceX < 0) setIsScrollRight(false);

    if (distanceY > 0) setIsScrollDown(true);
    else if (distanceY < 0) setIsScrollDown(false);

    prevPosition.current = scrollPosition;
    setScrollPosition({ scrollX, scrollY, scrollProgressX, scrollProgressY });
  }, [scrollPosition]);

  useEffect(handleScrolling, []);
  useEventListener('scroll', handleScrolling, options);

  return { ref, ...scrollPosition, isScrollRight, isScrollDown };
};
