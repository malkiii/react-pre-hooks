import { RefObject, useCallback, useRef } from 'react';
import { useEventListener } from '..';
import { getCurrentMousePosition } from '../utils';

export type SwipeAction = {
  readonly state: 'start' | 'moving' | 'end';
  readonly direction?: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  readonly deltaX: number;
  readonly deltaY: number;
  readonly initialX: number;
  readonly initialY: number;
  readonly isHolding: boolean;
  readonly event: TouchEvent | MouseEvent;
};

export type SwipeEventHandler = (action: SwipeAction) => any;

export type SwipeOptions<T extends EventTarget> = {
  ref?: RefObject<T> | null;
  mouse?: boolean;
};

export const useSwiping = <T extends EventTarget = Window>(
  handler: SwipeEventHandler,
  options: SwipeOptions<T> = {}
) => {
  const { ref, mouse = false } = options;
  const targetRef = ref ?? useRef<T>(null);

  const delta = useRef({ x: 0, y: 0 });
  const initialPosition = useRef<typeof delta.current>();

  const callback = useCallback(
    (state: SwipeAction['state'], event: SwipeAction['event']) => {
      if (!initialPosition.current) return;

      const currentPosition = getCurrentMousePosition(event);
      delta.current = {
        x: initialPosition.current.x - currentPosition.x,
        y: initialPosition.current.y - currentPosition.y
      };

      const direction =
        Math.abs(delta.current.x) >= Math.abs(delta.current.y)
          ? delta.current.x > 0
            ? 'LEFT'
            : 'RIGHT'
          : delta.current.y > 0
          ? 'UP'
          : 'DOWN';

      handler({
        state,
        direction,
        deltaX: delta.current.x,
        deltaY: delta.current.y,
        initialX: initialPosition.current.x,
        initialY: initialPosition.current.y,
        isHolding: state !== 'end',
        event
      });
    },
    [handler]
  );

  const handleTouchStart = useCallback(
    (event: SwipeAction['event']) => {
      initialPosition.current = getCurrentMousePosition(event);

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

      initialPosition.current = undefined;
    },
    [callback]
  );

  const eventOptions = { ref: targetRef };

  useEventListener(['touchmove', mouse && 'mousemove'], handleTouchMove, eventOptions);
  useEventListener(['touchstart', mouse && 'mousedown'], handleTouchStart, eventOptions);
  // prettier-ignore
  useEventListener(['touchend', 'touchcancel', mouse && 'mouseup', mouse && 'mouseleave'], handleTouchEnd, eventOptions);

  return targetRef;
};
