import { useCallback, useState } from 'react';
import { useEventListener } from '../useEventListener';
import { useTimeout } from '../useTimeout';
import { useNewRef } from '../utils/useNewRef';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useHover | useHover} hook.
 */
export const useHover = <T extends HTMLElement = HTMLDivElement>(
  args: {
    ref?: React.RefObject<T> | null;
    delay?: number | { hover?: number; unhover?: number };
  } = {}
) => {
  const targetRef = useNewRef<T>(args.ref);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const delay =
    typeof args.delay === 'number' ? { hover: args.delay, unhover: args.delay } : args.delay ?? {};

  const hoverTimeout = useTimeout({
    callback: () => setIsHovered(true),
    timeout: delay.hover ?? 0
  });

  const unhoverTimeout = useTimeout({
    callback: () => setIsHovered(false),
    timeout: delay.unhover ?? 0
  });

  const handleHover = useCallback(() => {
    hoverTimeout.start();
    unhoverTimeout.cancel();
  }, [hoverTimeout]);

  const handleUnhover = useCallback(() => {
    unhoverTimeout.start();
    hoverTimeout.cancel();
  }, [unhoverTimeout]);

  useEventListener({ event: 'mouseenter', handler: handleHover, ref: targetRef });
  useEventListener({ event: 'mouseleave', handler: handleUnhover, ref: targetRef });

  return { ref: targetRef, isHovered };
};
