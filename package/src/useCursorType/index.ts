import { CSSProperties, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { addEvents } from '@/src/utils';

export type CursorType = CSSProperties['cursor'];

export const useCursorType = <T extends HTMLElement = HTMLDivElement>(
  ref?: RefObject<T> | null
) => {
  const targetRef = ref ?? useRef<T>(null);
  const [cursor, setCursor] = useState<CursorType>('auto');

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!event.target) return;
    setCursor(window.getComputedStyle(event.target as any).cursor);
  }, []);

  useEffect(() => {
    return addEvents(['mousemove', 'mousedown', 'mouseup'], handleMouseMove, {
      ref: targetRef.current ?? window,
      passive: true
    });
  }, []);

  return { ref: targetRef, cursor };
};
