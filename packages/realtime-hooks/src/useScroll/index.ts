import { RefObject, useState } from 'react';
import { useEventListener, useOrCreateRef } from '@/src';

export const useScroll = <T extends HTMLElement = HTMLElement>(ref?: RefObject<T>) => {
  const targetRef = useOrCreateRef<T>(ref || (document.body as any));
  const options = { element: targetRef.current };

  const [isScrollDown, setIsScrollDown] = useState<boolean>();
  const [isScrollRight, setIsScrollRight] = useState<boolean>();
  const [prevPosition, setPrevPosition] = useState<typeof scrollPosition>();
  const [scrollPosition, setScrollPosition] = useState({
    scrollX: 0,
    scrollY: 0,
    scrollProgressX: 0,
    scrollProgressY: 0
  });

  const handleScrolling = () => {
    if (!targetRef.current) return;

    const element = targetRef.current;
    const scrollX = element.scrollLeft || window.scrollX;
    const scrollY = element.scrollTop || window.scrollY;

    const maxScrollX = element.scrollWidth - element.clientWidth;
    const maxScrollY = element.scrollHeight - element.clientHeight;
    const scrollProgressX = (element.scrollLeft / maxScrollX) * 100;
    const scrollProgressY = (element.scrollTop / maxScrollY) * 100;

    if (prevPosition) {
      const distanceX = scrollPosition.scrollX - prevPosition.scrollX;
      const distanceY = scrollPosition.scrollY - prevPosition.scrollY;

      if (distanceX > 0) setIsScrollRight(true);
      else if (distanceX < 0) setIsScrollRight(false);

      if (distanceY > 0) setIsScrollDown(true);
      else if (distanceY < 0) setIsScrollDown(false);
    }

    setPrevPosition(scrollPosition);
    setScrollPosition({ scrollX, scrollY, scrollProgressX, scrollProgressY });
  };

  useEventListener('scroll', handleScrolling, options);

  return { ref: targetRef, ...scrollPosition, isScrollRight, isScrollDown };
};
