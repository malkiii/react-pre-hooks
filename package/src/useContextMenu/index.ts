import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { addEvents } from '../utils';

export const useContextMenu = <T extends HTMLElement = HTMLDivElement>(
  ref?: RefObject<T> | null
) => {
  const targetRef = ref ?? useRef<T>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canShow, setCanShow] = useState<boolean>(false);

  const toggle = useCallback((show?: boolean) => {
    setCanShow(can => show ?? !can);
  }, []);

  useEffect(() => {
    const options = { ref: targetRef.current ?? window };

    const handleRightClick = (event: MouseEvent) => {
      event.preventDefault();
      setPosition({ x: event.pageX, y: event.pageY });
    };
    const handleMouseDown = () => {
      setCanShow(false);
    };
    const handleMouseUp = (event: MouseEvent) => {
      setCanShow(event.button === 2);
    };

    const clearRightClick = addEvents('contextmenu', handleRightClick, options);
    const clearMouseDown = addEvents('mousedown', handleMouseDown, options);
    const clearMouseUp = addEvents('mouseup', handleMouseUp, options);

    return () => {
      clearRightClick();
      clearMouseDown();
      clearMouseUp();
    };
  }, [ref]);

  return { ref: targetRef, clientX: position.x, clientY: position.y, canShow, toggle };
};
