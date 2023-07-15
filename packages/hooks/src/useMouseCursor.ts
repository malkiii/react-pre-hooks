import { RefObject, useRef, useState } from 'react';
import { useEventListener } from './useEventListener';

export const useMouseCursor = <T extends HTMLElement>(ref?: RefObject<T>) => {
  const targetRef = ref || useRef(document.body);
  const options = { ref: targetRef } as any;

  const [isOut, setIsOut] = useState<boolean>();
  const [isDown, setIsDown] = useState<boolean>();

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = ({ offsetX: x, offsetY: y }: MouseEvent) => setPosition({ x, y });

  useEventListener('mousemove', handleMouseMove, options);

  useEventListener('mouseup', () => setIsDown(false), options);
  useEventListener('mousedown', () => setIsDown(true), options);

  useEventListener('mouseenter', () => setIsOut(false), options);
  useEventListener('mouseleave', () => setIsOut(true), options);

  return { ...position, isOut, isDown };
};
