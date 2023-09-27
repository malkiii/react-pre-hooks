import { useRef, useState } from 'react';
import { useEventListener } from '@/src';
import { getCurrentMousePosition } from '@/src/utils';

export const useMouse = <T extends HTMLElement = HTMLDivElement>(target: T | null = null) => {
  const ref = useRef<T>(target);
  const options = { target: ref.current ?? window };

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

  return { ref, ...position, isOut, isDown };
};
