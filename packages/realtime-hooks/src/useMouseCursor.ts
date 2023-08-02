import { RefObject, useState } from 'react';
import { useEventListener, useOrCreateRef } from '.';

export const useMouseCursor = <T extends HTMLElement = HTMLElement>(ref?: RefObject<T>) => {
  const targetRef = useOrCreateRef<T>(ref || (document.body as any));
  const options = { element: targetRef.current };

  const [isOut, setIsOut] = useState<boolean>();
  const [isDown, setIsDown] = useState<boolean>();

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent | TouchEvent) => {
    const isMouseEvent = 'offsetX' in event;
    if (isMouseEvent) setPosition({ x: event.offsetX, y: event.offsetY });
    else setPosition({ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY });
  };

  useEventListener(['mousemove', 'touchmove'], handleMouseMove as any, options);

  useEventListener(['mouseup', 'touchstart'], () => setIsDown(false), options);
  useEventListener(['mousedown', 'touchend'], () => setIsDown(true), options);

  useEventListener(['mouseenter', 'touchstart'], () => setIsOut(false), options);
  useEventListener(['mouseleave', 'touchend', 'touchcancel'], () => setIsOut(true), options);

  return { ...position, isOut, isDown };
};
