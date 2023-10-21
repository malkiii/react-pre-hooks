import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { addEvents } from '../utils';

export const useScroll = <T extends HTMLElement = HTMLDivElement>(ref?: RefObject<T> | null) => {
  const targetRef = ref ?? useRef<T>(null);
  const initialValues = { x: 0, y: 0, progressX: 0, progressY: 0 };

  const [isScrollDown, setIsScrollDown] = useState<boolean>();
  const [isScrollRight, setIsScrollRight] = useState<boolean>();

  const [scrollPosition, setScrollPosition] = useState(initialValues);
  const prevPosition = useRef<typeof scrollPosition>(initialValues);

  const handleScrolling = useCallback(() => {
    const x = targetRef.current?.scrollLeft ?? window.scrollX;
    const y = targetRef.current?.scrollTop ?? window.scrollY;

    const element = targetRef.current ?? document.body;

    const maxScrollX = element.scrollWidth - element.clientWidth;
    const maxScrollY = element.scrollHeight - element.clientHeight;
    const progressX = (x / maxScrollX) * 100;
    const progressY = (y / maxScrollY) * 100;

    const distanceX = x - prevPosition.current.x;
    const distanceY = y - prevPosition.current.y;

    if (distanceX > 0) setIsScrollRight(true);
    else if (distanceX < 0) setIsScrollRight(false);

    if (distanceY > 0) setIsScrollDown(true);
    else if (distanceY < 0) setIsScrollDown(false);

    prevPosition.current = scrollPosition;
    setScrollPosition({ x, y, progressX, progressY });
  }, [scrollPosition]);

  useEffect(() => {
    handleScrolling();
    return addEvents('scroll', handleScrolling, { ref: targetRef.current ?? window });
  }, [ref]);

  return { ref: targetRef, ...scrollPosition, isScrollRight, isScrollDown };
};
