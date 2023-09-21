import { CSSProperties, RefObject, useCallback, useRef, useState } from 'react';
import { useEventListener } from '@/src';

export type CursorType = CSSProperties['cursor'];

export const useCursorType = <T extends HTMLElement = HTMLDivElement>(ref?: RefObject<T>) => {
  const targetRef = ref || useRef<T>(null);
  const [cursor, setCursor] = useState<CursorType>('auto');

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!event.target) return;
    setCursor(window.getComputedStyle(event.target as any).cursor);
  }, []);

  useEventListener(['mousemove', 'mousedown', 'mouseup'], handleMouseMove, {
    target: targetRef.current || window,
    passive: true
  });

  return { targetRef, cursor };
};
