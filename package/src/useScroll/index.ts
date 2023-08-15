import { RefObject, useRef, useState } from 'react';
import { useEventListener } from '@/src';

export const useScroll = <T extends HTMLElement = HTMLElement>(ref?: RefObject<T>) => {
  const targetRef = ref || useRef<T>(document.body as any);
  const options = { target: targetRef.current };

  const [isScrollDown, setIsScrollDown] = useState<boolean>();
  const [isScrollRight, setIsScrollRight] = useState<boolean>();
  const scrollPosition = useRef({
    scrollX: 0,
    scrollY: 0,
    scrollProgressX: 0,
    scrollProgressY: 0
  });
  const prevPosition = useRef<typeof scrollPosition.current>();

  const handleScrolling = () => {
    if (!targetRef.current) return;

    const element = targetRef.current;
    const scrollX = element.scrollLeft || window.scrollX;
    const scrollY = element.scrollTop || window.scrollY;

    const maxScrollX = element.scrollWidth - element.clientWidth;
    const maxScrollY = element.scrollHeight - element.clientHeight;
    const scrollProgressX = (element.scrollLeft / maxScrollX) * 100;
    const scrollProgressY = (element.scrollTop / maxScrollY) * 100;

    prevPosition.current = scrollPosition.current;
    scrollPosition.current = { scrollX, scrollY, scrollProgressX, scrollProgressY };

    const distanceX = scrollPosition.current.scrollX - prevPosition.current.scrollX;
    const distanceY = scrollPosition.current.scrollY - prevPosition.current.scrollY;

    if (distanceX > 0) setIsScrollRight(true);
    else if (distanceX < 0) setIsScrollRight(false);

    if (distanceY > 0) setIsScrollDown(true);
    else if (distanceY < 0) setIsScrollDown(false);
  };

  useEventListener('scroll', handleScrolling, options);

  return { ...scrollPosition, isScrollRight, isScrollDown };
};
