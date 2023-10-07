import { useRef, useState } from 'react';
import { useEventListener, useTimeout } from '@/src';

export type HoverOptions<T extends HTMLElement> = {
  target?: T | null;
  delay?: number | { hover?: number; unhover?: number };
};

export const useHover = <T extends HTMLElement = HTMLDivElement>(options: HoverOptions<T> = {}) => {
  const ref = useRef<T>(options.target ?? null);
  const eventOptions = { target: ref.current };

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const delay =
    typeof options.delay === 'number'
      ? { hover: options.delay, unhover: options.delay }
      : options.delay ?? {};

  const hoverTimeout = useTimeout(() => setIsHovered(true), { timeout: delay.hover ?? 0 });
  const unhoverTimeout = useTimeout(() => setIsHovered(false), { timeout: delay.unhover ?? 0 });

  const hover = () => {
    hoverTimeout.start();
    unhoverTimeout.cancel();
  };

  const unhover = () => {
    unhoverTimeout.start();
    hoverTimeout.cancel();
  };

  useEventListener('mouseenter', hover, eventOptions);
  useEventListener('mouseleave', unhover, eventOptions);

  return { ref, isHovered };
};
