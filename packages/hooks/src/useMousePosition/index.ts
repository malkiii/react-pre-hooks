import { useCallback, useState } from 'react';
import { useEventListener } from '../useEventListener';
import { getPointerPosition } from '../utils';
import { useNewRef } from '../utils/useNewRef';

export const useMousePosition = <T extends HTMLElement = HTMLDivElement>(
  ref?: React.RefObject<T>
) => {
  const targetRef = useNewRef<T>(ref);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((event: MouseEvent) => {
    setPosition(getPointerPosition(event));
  }, []);

  useEventListener({
    event: 'mousemove',
    handler: handleMouseMove,
    target: () => targetRef.current ?? window
  });

  return { ref: targetRef, ...position };
};
