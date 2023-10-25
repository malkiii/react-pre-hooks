import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { addEvents } from '../utils';

export const useScrollDirection = <T extends HTMLElement = HTMLDivElement>(
  ref?: RefObject<T> | null
) => {
  const targetRef = ref ?? useRef<T>(null);

  const prevPosition = useRef({ x: 0, y: 0 });
  const [direction, setDirection] = useState({
    isUp: false,
    isDown: false,
    isLeft: false,
    isRight: false
  });

  const handleScrolling = useCallback(() => {
    const x = targetRef.current?.scrollLeft ?? window.scrollX;
    const y = targetRef.current?.scrollTop ?? window.scrollY;

    const distanceX = x - prevPosition.current.x;
    const distanceY = y - prevPosition.current.y;

    prevPosition.current = { x, y };

    setDirection({
      isLeft: distanceX < 0,
      isRight: distanceX > 0,
      isUp: distanceY < 0,
      isDown: distanceY > 0
    });
  }, []);

  useEffect(() => {
    handleScrolling();
    return addEvents('scroll', handleScrolling, { ref: targetRef.current ?? window });
  }, [ref]);

  return { ref: targetRef, ...direction };
};
