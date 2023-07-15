import { RefObject, useRef, useState } from 'react';
import { useEventListener } from './useEventListener';

export const useScroll = <T extends HTMLElement>(ref?: RefObject<T>) => {
  const targetRef = ref;
  const options = { ref: targetRef || useRef(document.body) } as any;

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
    if (ref && !ref.current) return;

    const element = options.ref.current as HTMLElement;
    const scrollX = targetRef?.current?.scrollLeft || window.scrollX;
    const scrollY = targetRef?.current?.scrollTop || window.scrollY;

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

  return { ...scrollPosition, isScrollRight, isScrollDown };
};
