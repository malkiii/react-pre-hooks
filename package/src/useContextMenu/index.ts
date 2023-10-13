import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { addEvents, getCurrentMousePosition } from '@/src/utils';

export const useContextMenu = <T extends HTMLElement = HTMLDivElement>(
  ref?: RefObject<T> | null
) => {
  const targetRef = useRef<T>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canShow, setCanShow] = useState<boolean>(false);

  const handleRightClick = useCallback((event: MouseEvent) => {
    if (event.target !== event.currentTarget) return;
    event.preventDefault();
    setPosition(getCurrentMousePosition(event));
    setCanShow(true);
  }, []);

  const handleLeftClick = useCallback(() => {
    setCanShow(false);
  }, []);

  const toggle = useCallback((show?: boolean) => {
    setCanShow(can => show ?? !can);
  }, []);

  useEffect(() => {
    const options = { ref: ref ?? targetRef.current ?? window };
    const clearRightClick = addEvents('contextmenu', handleRightClick, options);
    const clearLeftClick = addEvents('click', handleLeftClick, options);

    return () => {
      clearRightClick();
      clearLeftClick();
    };
  }, [ref]);

  return { ref: targetRef, offsetX: position.x, offsetY: position.y, canShow, toggle };
};
