import { CSSProperties, useCallback, useRef, useState } from 'react';
import { useEventListener } from '@/src';

export type CursorType = CSSProperties['cursor'];

export const useCursorType = <T extends HTMLElement = HTMLDivElement>(target: T | null = null) => {
  const ref = useRef<T>(target);
  const [cursor, setCursor] = useState<CursorType>('auto');

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!event.target) return;
    setCursor(window.getComputedStyle(event.target as any).cursor);
  }, []);

  useEventListener(['mousemove', 'mousedown', 'mouseup'], handleMouseMove, {
    target: ref.current ?? window,
    passive: true
  });

  return { ref, cursor };
};
