import { RefObject, useRef, useState } from 'react';
import { useEventListener } from '@/src';

export const useScroll = <T extends HTMLElement = HTMLDivElement>(ref?: RefObject<T>) => {
  const targetRef = ref || useRef<T>(null);
  const options = { target: targetRef.current || window };
  const initialProps = {
    scrollX: 0,
    scrollY: 0,
    scrollProgressX: 0,
    scrollProgressY: 0
  };

  const [isScrollDown, setIsScrollDown] = useState<boolean>();
  const [isScrollRight, setIsScrollRight] = useState<boolean>();

  const [scrollPosition, setScrollPosition] = useState(initialProps);
  const [prevPosition, setPrevPosition] = useState<typeof scrollPosition>(initialProps);

  const handleScrolling = () => {
    const scrollX = targetRef.current?.scrollLeft || window.scrollX;
    const scrollY = targetRef.current?.scrollTop || window.scrollY;

    const target = targetRef.current || document.body;

    const maxScrollX = target.scrollWidth - target.clientWidth;
    const maxScrollY = target.scrollHeight - target.clientHeight;
    const scrollProgressX = (target.scrollLeft / maxScrollX) * 100;
    const scrollProgressY = (target.scrollTop / maxScrollY) * 100;

    const distanceX = scrollX - prevPosition.scrollX;
    const distanceY = scrollY - prevPosition.scrollY;

    if (distanceX > 0) setIsScrollRight(true);
    else if (distanceX < 0) setIsScrollRight(false);

    if (distanceY > 0) setIsScrollDown(true);
    else if (distanceY < 0) setIsScrollDown(false);

    setPrevPosition(scrollPosition);
    setScrollPosition({ scrollX, scrollY, scrollProgressX, scrollProgressY });
  };

  useEventListener('scroll', handleScrolling, options);

  return { targetRef, ...scrollPosition, isScrollRight, isScrollDown };
};
