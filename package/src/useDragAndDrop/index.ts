import { RefObject, useCallback, useRef } from 'react';
import { useEventListener } from '..';
import { getCurrentMousePosition } from '../utils';
import { useNewRef } from '../utils/useNewRef';

export type DragAction = {
  readonly state: 'start' | 'moving' | 'end';
  readonly clientX: number;
  readonly clientY: number;
  readonly initialX: number;
  readonly initialY: number;
  readonly target: EventTarget;
  readonly event: MouseEvent | TouchEvent;
};

export type DragActionHandler = (action: DragAction) => any;

type DraggingOptions<T extends HTMLElement> = {
  ref?: RefObject<T> | null;
  touches?: boolean;
};

export const useDragAndDrop = <T extends HTMLElement = HTMLDivElement>(
  handler: DragActionHandler,
  options: DraggingOptions<T> = {}
) => {
  const { ref, touches = false } = options;
  const targetRef = useNewRef<T>(ref);

  const draggedElement = useRef<EventTarget>();
  const initialPosition = useRef<{ x: number; y: number }>();

  const callback = useCallback(
    (state: DragAction['state'], event: DragAction['event']) => {
      if (!draggedElement.current || !initialPosition.current) return;

      const currentPosition = getCurrentMousePosition(event);

      handler({
        state,
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

  const eventOptions = { target: targetRef };

  useEventListener(['mousemove', touches && 'touchmove'], handleDragging, eventOptions);
  useEventListener(['mousedown', touches && 'touchstart'], handleMouseDown, eventOptions);
  // prettier-ignore
  useEventListener(['mouseup', touches && 'touchend', touches && 'touchcancel'], handleDropping, eventOptions);

  return targetRef;
};
