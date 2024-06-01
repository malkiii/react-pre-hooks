import { useCallback, useState } from 'react';
import { useEventListener } from '../useEventListener';
import { getPointerPosition } from '../utils';
import { useNewRef } from '../utils/useNewRef';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useMousePosition | useMousePosition} hook.
 */
export const useMousePosition = <T extends HTMLElement = HTMLDivElement>(
  ref?: React.RefObject<T>
) => {
  const targetRef = useNewRef<T>(ref);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState<boolean>();

  const handleMouseMove = useCallback((event: MouseEvent) => {
    setIsInside(event.type !== 'mouseleave');

    setPosition(getPointerPosition(event));
  }, []);

  useEventListener({
    event: ['mousemove', 'mouseenter', 'mouseleave'],
    handler: handleMouseMove,
    target: () => targetRef.current ?? window
  });

  return { ref: targetRef, isInside, ...position };
};
