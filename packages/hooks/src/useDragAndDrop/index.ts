import { useCallback, useRef } from 'react';
import { useEventListener } from '../useEventListener';
import { getPointerPosition } from '../utils';
import { useNewRef } from '../utils/useNewRef';

export type DragAction = {
  type: 'start' | 'moving' | 'end';
  clientX: number;
  clientY: number;
  initialX: number;
  initialY: number;
  target: EventTarget;
  event: PointerEvent;
};

export type DragActionHandler = (action: DragAction) => any;

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useDragAndDrop | useDragAndDrop} hook.
 */
export const useDragAndDrop = <T extends HTMLElement = HTMLDivElement>(args: {
  handler: DragActionHandler;
  ref?: React.RefObject<T> | null;
}) => {
  const targetRef = useNewRef<T>(args.ref);

  const draggedElement = useRef<EventTarget>();
  const initialPosition = useRef<{ x: number; y: number }>();

  const callback = useCallback(
    (type: DragAction['type'], event: DragAction['event']) => {
      if (!draggedElement.current || !initialPosition.current) return;

      const currentPosition = getPointerPosition(event);

      args.handler({
        type,
        clientX: currentPosition.x,
        clientY: currentPosition.y,
        initialX: initialPosition.current.x,
        initialY: initialPosition.current.y,
        target: draggedElement.current,
        event
      });
    },
    [args.handler]
  );

  const handleMouseDown = useCallback(
    (event: DragAction['event']) => {
      if (!event.target || event.target === targetRef.current) return;

      draggedElement.current = event.target;
      initialPosition.current = getPointerPosition(event);

      callback('start', event);
    },
    [callback]
  );

  const handleDragging = useCallback(
    (event: DragAction['event']) => callback('moving', event),
    [callback]
  );

  const handleDropping = useCallback(
    (event: DragAction['event']) => {
      callback('end', event);

      draggedElement.current = undefined;
      initialPosition.current = undefined;
    },
    [callback]
  );

  useEventListener({ event: 'pointermove', handler: handleDragging, ref: targetRef });
  useEventListener({ event: 'pointerdown', handler: handleMouseDown, ref: targetRef });
  useEventListener({
    event: ['pointerup', 'pointerleave', 'pointercancel'],
    handler: handleDropping,
    ref: targetRef
  });

  return targetRef;
};
