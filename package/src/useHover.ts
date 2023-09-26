import { RefObject, useRef, useState } from 'react';
import { useEventListener, useTimeout } from '@/src';

export type HoverOptions<T extends HTMLElement> = {
  ref?: RefObject<T>;
  delay?: number | { hover?: number; unhover?: number };
};

export const useHover = <T extends HTMLElement = HTMLDivElement>(options: HoverOptions<T> = {}) => {
  const targetRef = options.ref || useRef<T>(null);
  const eventOptions = { target: targetRef.current };

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const delay =
    typeof options.delay === 'number'
      ? { hover: options.delay, unhover: options.delay }
      : options.delay ?? {};

  const hoverTimeout = useTimeout(() => setIsHovered(true), { timeout: delay.hover ?? 0 });
  const unhoverTimeout = useTimeout(() => setIsHovered(false), { timeout: delay.unhover ?? 0 });

  const hover = () => {
    hoverTimeout.start();
    unhoverTimeout.stop();
  };

  const unhover = () => {
    unhoverTimeout.start();
    hoverTimeout.stop();
  };

  useEventListener('mouseenter', hover, eventOptions);
  useEventListener('mouseleave', unhover, eventOptions);

  return { targetRef, isHovered };
};
