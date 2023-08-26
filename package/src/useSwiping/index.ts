import { useCallback, useRef } from 'react';
import { useEventListener } from '@/src';
import { getCurrentMousePosition } from '@/src/utils';

export interface SwipeAction {
  readonly deltaX: number;
  readonly deltaY: number;
  readonly initialX: number;
  readonly initialY: number;
  readonly direction?: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  readonly event: TouchEvent | MouseEvent;
}

export type SwipActionHandler = (action: SwipeAction) => any;

export type SwipOptions = {
  mouse?: boolean;
  eventOptions?: AddEventListenerOptions;
};

export const useSwiping = (handler: SwipActionHandler, options: SwipOptions = {}) => {
  const delta = useRef<{ x: number; y: number }>();
  const initialPosition = useRef<typeof delta.current>();

  const handleTouchStart = useCallback(
    (event: SwipeAction['event']) => {
      initialPosition.current = getCurrentMousePosition(event);

      const { x: initialX, y: initialY } = initialPosition.current;
      handler({ deltaX: 0, deltaY: 0, initialX, initialY, event });
    },
    [handler]
  );

  const handleTouchEnd = useCallback(
    (event: SwipeAction['event']) => {
      const { x: deltaX, y: deltaY } = delta.current!;
      const { x: initialX, y: initialY } = initialPosition.current!;

      const direction: SwipeAction['direction'] =
        Math.abs(deltaX) >= Math.abs(deltaY)
          ? deltaX > 0
            ? 'LEFT'
            : 'RIGHT'
          : deltaY > 0
          ? 'UP'
          : 'DOWN';

      handler({ deltaX, deltaY, initialX, initialY, direction, event });

      initialPosition.current = undefined;
    },
    [handler]
  );

  const handleTouchMove = useCallback(
    (event: SwipeAction['event']) => {
      if (!initialPosition.current) return;

      const currentPosition = getCurrentMousePosition(event);
      delta.current = {
        x: initialPosition.current.x - currentPosition.x,
        y: initialPosition.current.y - currentPosition.y
      };

      handler({
        deltaX: delta.current.x,
        deltaY: delta.current.y,
        initialX: initialPosition.current.x,
        initialY: initialPosition.current.y,
        event
      });
    },
    [handler]
  );

  const mouse = !!options.mouse;
  const eventOptions = options.eventOptions;

  useEventListener(['touchstart', mouse && 'mousedown'], handleTouchStart, eventOptions);
  useEventListener(['touchend', mouse && 'mouseup', 'touchcancel'], handleTouchEnd, eventOptions);
  useEventListener(['touchmove', mouse && 'mousemove'], handleTouchMove, eventOptions);
};
