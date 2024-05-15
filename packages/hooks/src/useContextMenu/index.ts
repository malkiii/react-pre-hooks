import { useCallback, useState } from 'react';
import { useEventListener } from '../useEventListener';
import { getPointerPosition } from '../utils';
import { useNewRef } from '../utils/useNewRef';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useContextMenu | useContextMenu} hook.
 */
export const useContextMenu = <T extends HTMLElement = HTMLDivElement>(
  ref?: React.RefObject<T> | null
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

  const handleMouseDown = useCallback((event: MouseEvent) => {
    setCanShow(false);
    if (event.button === 2) setPosition(getPointerPosition(event));
  }, []);

  const handleMouseUp = useCallback((event: MouseEvent) => {
    if (event.button !== 2) return;
    event.stopPropagation();
    setCanShow(true);
  }, []);

  const target = () => targetRef.current ?? window;

  useEventListener({ event: 'mouseup', handler: handleMouseUp, target });
  useEventListener({ event: 'mousedown', handler: handleMouseDown, target });
  useEventListener({ event: 'contextmenu', handler: handleRightClick, target });
  useEventListener({ event: 'scroll', handler: () => setCanShow(false), target: () => window });

  return { ref: targetRef, clientX: position.x, clientY: position.y, canShow, toggle };
};
