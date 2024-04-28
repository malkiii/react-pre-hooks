import { RefObject, useCallback, useState } from 'react';
import { useEventListener } from '../useEventListener';
import { useTimeout } from '../useTimeout';
import { useNewRef } from '../utils/useNewRef';

export type HoverOptions<T extends HTMLElement> = {
  ref?: RefObject<T> | null;
  delay?: number | { hover?: number; unhover?: number };
};

export const useHover = <T extends HTMLElement = HTMLDivElement>(options: HoverOptions<T> = {}) => {
  const targetRef = useNewRef<T>(options.ref);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const delay =
    typeof options.delay === 'number'
      ? { hover: options.delay, unhover: options.delay }
      : options.delay ?? {};

  const hoverTimeout = useTimeout(() => setIsHovered(true), { timeout: delay.hover ?? 0 });
  const unhoverTimeout = useTimeout(() => setIsHovered(false), { timeout: delay.unhover ?? 0 });

  const handleHover = useCallback(() => {
    hoverTimeout.start();
    unhoverTimeout.cancel();
  }, [hoverTimeout]);

  const handleUnhover = useCallback(() => {
    unhoverTimeout.start();
    hoverTimeout.cancel();
  }, [unhoverTimeout]);

  useEventListener('mouseenter', handleHover, { ref: targetRef });
  useEventListener('mouseleave', handleUnhover, { ref: targetRef });

  return { ref: targetRef, isHovered };
};
