import { RefObject, useEffect, useRef, useState } from 'react';
import { addEvents, getCurrentMousePosition } from '@/src/utils';

type MouseOptions<T extends HTMLElement> = {
  ref?: RefObject<T> | null;
  touches?: boolean;
};

export const useMouse = <T extends HTMLElement = HTMLDivElement>(options: MouseOptions<T> = {}) => {
  const targetRef = useRef<T>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isOut, setIsOut] = useState<boolean>();
  const [isDown, setIsDown] = useState<boolean>();

  const handleMouseMove = (event: MouseEvent | TouchEvent) => {
    setIsOut(false);
    setPosition(getCurrentMousePosition(event));
  };

  /* prettier-ignore */
  useEffect(() => {
    const { ref, touches = false } = options;
    const eventOptions = { ref: ref ?? targetRef.current ?? window };

    const clearMouseMove = addEvents(['mousemove', touches && 'touchmove'], handleMouseMove, eventOptions);

    const clearMouseUp = addEvents(['mouseup', touches && 'touchend'], () => setIsDown(false), eventOptions);
    const clearMouseDown = addEvents(['mousedown', touches && 'touchstart'], () => setIsDown(true), eventOptions);

    const clearMouseEnter = addEvents(['mouseenter', touches && 'touchstart'], () => setIsOut(false), eventOptions);
    const clearMouseLeave = addEvents(['mouseleave', touches && 'touchcancel'], () => setIsOut(true), eventOptions);

    return () => {
      clearMouseMove();
      clearMouseUp();
      clearMouseDown();
      clearMouseEnter();
      clearMouseLeave();
    };
  }, [options.ref]);

  return { ref: targetRef, ...position, isOut, isDown };
};
