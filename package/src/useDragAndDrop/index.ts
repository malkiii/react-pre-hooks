import { RefObject, useCallback, useRef } from 'react';
import { useEventListener } from '@/src';
import { getCurrentMousePosition } from '@/src/utils';

export interface DragAction {
  readonly state: 'start' | 'moving' | 'end';
  readonly offsetX: number;
  readonly offsetY: number;
  readonly initialX: number;
  readonly initialY: number;
  readonly target: EventTarget;
  readonly event: MouseEvent | TouchEvent;
}

export type DragEventHandler = (action: DragAction) => any;

type DraggingOptions<T extends HTMLElement> = {
  ref?: RefObject<T> | null;
  touches?: boolean;
};

export const useDragAndDrop = <T extends HTMLElement = HTMLDivElement>(
  handler: DragEventHandler,
  options: DraggingOptions<T> = {}
) => {
  const { ref, touches = false } = options;
  const targetRef = ref ?? useRef<T>(null);

  const draggedElement = useRef<EventTarget>();
  const initialPosition = useRef<{ x: number; y: number }>();

  const callback = useCallback(
    (state: DragAction['state'], event: DragAction['event']) => {
      if (!draggedElement.current || !initialPosition.current) return;

      const offset = getCurrentMousePosition(event);

      handler({
        state,
        offsetX: offset.x,
        offsetY: offset.y,
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
      initialPosition.current = getCurrentMousePosition(event);

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

  useEventListener(['mousemove', touches && 'touchmove'], handleDragging, eventOptions);
  useEventListener(['mousedown', touches && 'touchstart'], handleMouseDown, eventOptions);
  // prettier-ignore
  useEventListener(['mouseup', touches && 'touchend', touches && 'touchcancel'], handleDropping, eventOptions);

  return targetRef;
};
