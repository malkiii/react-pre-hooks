import { RefObject, useEffect, useState } from 'react';
import { addEvents, getCurrentMousePosition } from '../utils';
import { useNewRef } from '../utils/useNewRef';

export const useMousePosition = <T extends HTMLElement = HTMLDivElement>(ref?: RefObject<T>) => {
  const targetRef = useNewRef<T>(ref);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition(getCurrentMousePosition(event));
    };

    return addEvents('mousemove', handleMouseMove, { target: targetRef.current ?? window });
  }, []);

  return { ref: targetRef, ...position };
};
