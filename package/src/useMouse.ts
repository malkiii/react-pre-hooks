import { useRef, useState } from 'react';
import { useEventListener } from '@/src';
import { getCurrentMousePosition } from '@/src/utils';

type MouseOptions<T extends HTMLElement> = {
  target?: T | null;
  touches?: boolean;
};

export const useMouse = <T extends HTMLElement = HTMLDivElement>(options: MouseOptions<T> = {}) => {
  const { target = null, touches = false } = options;

  const ref = useRef<T>(target);
  const eventOptions = { target: ref.current ?? window };

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isOut, setIsOut] = useState<boolean>();
  const [isDown, setIsDown] = useState<boolean>();

  const handleMouseMove = (event: MouseEvent | TouchEvent) => {
    setIsOut(false);
    setPosition(getCurrentMousePosition(event));
  };

  useEventListener(['mousemove', touches && 'touchmove'], handleMouseMove, eventOptions);

  useEventListener(['mouseup', touches && 'touchend'], () => setIsDown(false), eventOptions);
  useEventListener(['mousedown', touches && 'touchstart'], () => setIsDown(true), eventOptions);

  useEventListener(['mouseenter', touches && 'touchstart'], () => setIsOut(false), eventOptions);
  useEventListener(['mouseleave', touches && 'touchcancel'], () => setIsOut(true), eventOptions);

  return { ref, ...position, isOut, isDown };
};
