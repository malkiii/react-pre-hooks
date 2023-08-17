import { RefObject, useRef, useState } from 'react';
import { useEventListener } from '@/src';

export const useMouseCursor = <T extends HTMLElement = HTMLDivElement>(ref?: RefObject<T>) => {
  const targetRef = ref || useRef<T>(null);
  const options = { target: targetRef.current || window };

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isOut, setIsOut] = useState<boolean>();
  const [isDown, setIsDown] = useState<boolean>();

  const handleMouseMove = (event: MouseEvent | TouchEvent) => {
    const isMouseEvent = 'offsetX' in event;

    setPosition(
      isMouseEvent
        ? { x: event.offsetX, y: event.offsetY }
        : { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY }
    );
  };

  useEventListener(['mousemove', 'touchmove'], handleMouseMove, options);

  useEventListener(['mouseup', 'touchend'], () => setIsDown(false), options);
  useEventListener(['mousedown', 'touchstart'], () => setIsDown(true), options);

  useEventListener(['mouseenter', 'touchstart'], () => setIsOut(false), options);
  useEventListener(['mouseleave', 'touchend', 'touchcancel'], () => setIsOut(true), options);

  return { targetRef, ...position, isOut, isDown };
};
