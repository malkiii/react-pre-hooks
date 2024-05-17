import { useCallback, useRef } from 'react';
import { useEventListener } from '../useEventListener';
import { getPointerPosition } from '../utils';
import { useNewRef } from '../utils/useNewRef';

export type SwipeAction = {
  type: 'start' | 'moving' | 'end';
  deltaX: number;
  deltaY: number;
  initialX: number;
  initialY: number;
  event: PointerEvent;
};

export type SwipeActionHandler = (action: SwipeAction) => any;

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useSwiping | useSwiping} hook.
 */
export const useSwiping = <T extends HTMLElement>(args: {
  handler: SwipeActionHandler;
  ref?: React.RefObject<T> | null;
}) => {
  const targetRef = useNewRef<T>(args.ref);

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

      args.handler({
        type,
        deltaX: delta.current.x,
        deltaY: delta.current.y,
        initialX: initialPosition.current.x,
        initialY: initialPosition.current.y,
        event
      });
    },
    [args.handler]
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
    (event: SwipeAction['event']) => callback('moving', event),
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

  useEventListener({ event: 'pointermove', handler: handleTouchMove, ref: targetRef });
  useEventListener({ event: 'pointerdown', handler: handleTouchStart, ref: targetRef });
  useEventListener({
    event: ['pointerup', 'pointercancel'],
    handler: handleTouchEnd,
    ref: targetRef
  });

  return targetRef;
};
