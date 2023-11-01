import { RefObject, useCallback, useEffect, useState } from 'react';
import { addEvents } from '../utils';
import { useNewRef } from '../utils/useNewRef';

export const useContextMenu = <T extends HTMLElement = HTMLDivElement>(
  ref?: RefObject<T> | null
) => {
  const targetRef = useNewRef<T>(ref);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canShow, setCanShow] = useState<boolean>(false);

  const toggle = useCallback((show?: boolean) => {
    setCanShow(can => show ?? !can);
  }, []);

  useEffect(() => {
    const options = { target: targetRef.current ?? window };

    const handleRightClick = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
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
