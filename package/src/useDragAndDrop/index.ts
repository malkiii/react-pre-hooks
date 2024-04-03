import { RefObject, useCallback, useRef } from 'react';
import { useEventListener } from '..';
import { getPointerPosition } from '../utils';
import { useNewRef } from '../utils/useNewRef';

export type DragAction = {
  readonly type: 'start' | 'moving' | 'end';
  readonly clientX: number;
  readonly clientY: number;
  readonly initialX: number;
  readonly initialY: number;
  readonly target: EventTarget;
  readonly event: PointerEvent;
};

export type DragActionHandler = (action: DragAction) => any;

type DraggingOptions<T extends HTMLElement> = {
  ref?: RefObject<T> | null;
};

export const useDragAndDrop = <T extends HTMLElement = HTMLDivElement>(
  handler: DragActionHandler,
  options: DraggingOptions<T> = {}
) => {
  const targetRef = useNewRef<T>(options.ref);

  const draggedElement = useRef<EventTarget>();
  const initialPosition = useRef<{ x: number; y: number }>();

  const callback = useCallback(
    (type: DragAction['type'], event: DragAction['event']) => {
      if (!draggedElement.current || !initialPosition.current) return;

      const currentPosition = getPointerPosition(event);

      handler({
        type,
        clientX: currentPosition.x,
        clientY: currentPosition.y,
        initialX: initialPosition.current.x,
        initialY: initialPosition.current.y,
        target: draggedElement.current,
        event
      });
    },
    [handler]
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

  const eventOptions = { ref: targetRef };

  useEventListener('pointermove', handleDragging, eventOptions);
  useEventListener('pointerdown', handleMouseDown, eventOptions);
  useEventListener(['pointerup', 'pointerleave', 'pointercancel'], handleDropping, eventOptions);

  return targetRef;
};
