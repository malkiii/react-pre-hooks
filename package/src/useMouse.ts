import { RefObject, useRef, useState } from 'react';
import { useEventListener } from '@/src';
import { getCurrentMousePosition } from '@/src/utils';

export const useMouse = <T extends HTMLElement = HTMLDivElement>(ref?: RefObject<T>) => {
  const targetRef = ref || useRef<T>(null);
  const options = { target: targetRef.current ?? window };

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isOut, setIsOut] = useState<boolean>();
  const [isDown, setIsDown] = useState<boolean>();

  const handleMouseMove = (event: MouseEvent | TouchEvent) => {
    setIsOut(false);
    setPosition(getCurrentMousePosition(event));
  };

  useEventListener(['mousemove', 'touchmove'], handleMouseMove, options);

  useEventListener(['mouseup', 'touchend'], () => setIsDown(false), options);
  useEventListener(['mousedown', 'touchstart'], () => setIsDown(true), options);

  useEventListener(['mouseenter', 'touchstart'], () => setIsOut(false), options);
  useEventListener(['mouseleave', 'touchcancel'], () => setIsOut(true), options);

  return { ref: targetRef, ...position, isOut, isDown };
};
