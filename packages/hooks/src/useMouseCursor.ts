import { RefObject, useRef, useState } from 'react';
import { useEventListener } from './useEventListener';
import { useToggle } from './useToggle';

export const useMouseCursor = <T extends HTMLElement>(ref?: RefObject<T>) => {
  const targetRef = ref || useRef(document.body);
  const options = { ref: targetRef } as any;

  const [isOut, toggleIsOut] = useToggle();
  const [isDown, toggleIsDown] = useToggle();

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = ({ offsetX: x, offsetY: y }: MouseEvent) => setPosition({ x, y });

  useEventListener('mousemove', handleMouseMove, options);

  useEventListener('mouseup', () => toggleIsDown(), options);
  useEventListener('mousedown', () => toggleIsDown(), options);

  useEventListener('mouseenter', () => toggleIsOut(), options);
  useEventListener('mouseleave', () => toggleIsOut(), options);

  return { ...position, isOut, isDown };
};
