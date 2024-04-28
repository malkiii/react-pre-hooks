import { RefObject, useCallback, useState } from 'react';
import { useEventListener } from '../useEventListener';
import { getPointerPosition } from '../utils';
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

  const handleRightClick = useCallback((event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setPosition(getPointerPosition(event));
  }, []);

  const handleMouseDown = useCallback(() => {
    setCanShow(false);
  }, []);

  const handleMouseUp = useCallback((event: MouseEvent) => {
    event.stopPropagation();
    setCanShow(event.button === 2);
  }, []);

  const options = { target: () => targetRef.current ?? window };

  useEventListener('mouseup', handleMouseUp, options);
  useEventListener('mousedown', handleMouseDown, options);
  useEventListener('contextmenu', handleRightClick, options);

  return { ref: targetRef, clientX: position.x, clientY: position.y, canShow, toggle };
};
