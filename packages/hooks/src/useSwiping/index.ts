import { RefObject, useCallback, useRef } from 'react';
import { useEventListener } from '../useEventListener';
import { getPointerPosition } from '../utils';
import { useNewRef } from '../utils/useNewRef';

export type SwipeAction = {
  readonly type: 'start' | 'moving' | 'end';
  readonly deltaX: number;
  readonly deltaY: number;
  readonly initialX: number;
  readonly initialY: number;
  readonly event: PointerEvent;
};

export type SwipeActionHandler = (action: SwipeAction) => any;

export type SwipeOptions<T extends EventTarget> = {
  ref?: RefObject<T> | null;
};

export const useSwiping = <T extends HTMLElement>(
  handler: SwipeActionHandler,
  options: SwipeOptions<T> = {}
) => {
  const targetRef = useNewRef<T>(options.ref);

  const delta = useRef({ x: 0, y: 0 });
  const initialPosition = useRef<typeof delta.current>();

  const callback = useCallback(
    (type: SwipeAction['type'], event: SwipeAction['event']) => {
      if (!initialPosition.current) return;

      const currentPosition = getPointerPosition(event);
      delta.current = {
        x: initialPosition.current.x - currentPosition.x,
        y: initialPosition.current.y - currentPosition.y
      };

      handler({
        type,
        deltaX: delta.current.x,
        deltaY: delta.current.y,
        initialX: initialPosition.current.x,
        initialY: initialPosition.current.y,
        event
      });
    },
    [handler]
  );

  const handleTouchStart = useCallback(
    (event: SwipeAction['event']) => {
      initialPosition.current = getPointerPosition(event);
      targetRef.current?.setPointerCapture(event.pointerId);

      callback('start', event);
    },
    [callback]
  );

  const handleTouchMove = useCallback(
    (event: SwipeAction['event']) => callback('end', event),
    [callback]
  );

  const handleTouchEnd = useCallback(
    (event: SwipeAction['event']) => {
      callback('end', event);

      targetRef.current?.releasePointerCapture(event.pointerId);
      initialPosition.current = undefined;
    },
    [callback]
  );

  const eventOptions = { ref: targetRef };

  useEventListener('pointermove', handleTouchMove, eventOptions);
  useEventListener('pointerdown', handleTouchStart, eventOptions);
  useEventListener(['pointerup', 'pointercancel'], handleTouchEnd, eventOptions);

  return targetRef;
};
