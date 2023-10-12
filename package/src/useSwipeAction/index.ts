import { useCallback, useEffect, useRef } from 'react';
import { EventListenerOptions } from '@/src';
import { addEvents, getCurrentMousePosition } from '@/src/utils';

export interface SwipeAction {
  readonly state: 'start' | 'moving' | 'end';
  readonly deltaX: number;
  readonly deltaY: number;
  readonly initialX: number;
  readonly initialY: number;
  readonly direction?: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  readonly isHolding: boolean;
  readonly event: TouchEvent | MouseEvent;
}

export type SwipeEventHandler = (action: SwipeAction) => any;

export type SwipeOptions<T extends EventTarget> = EventListenerOptions<T> & {
  mouse?: boolean;
};

export const useSwipeAction = <T extends EventTarget = Window>(
  handler: SwipeEventHandler,
  options: SwipeOptions<T> = {}
) => {
  const targetRef = useRef<T>(null);
  const delta = useRef({ x: 0, y: 0 });
  const initialPosition = useRef<typeof delta.current>();

  const getSwipeDirection = (): SwipeAction['direction'] => {
    const { x: deltaX, y: deltaY } = delta.current;
    return Math.abs(deltaX) >= Math.abs(deltaY)
      ? deltaX > 0
        ? 'LEFT'
        : 'RIGHT'
      : deltaY > 0
      ? 'UP'
      : 'DOWN';
  };

  const handleTouchStart = useCallback(
    (event: SwipeAction['event']) => {
      initialPosition.current = getCurrentMousePosition(event);
      const { x: initialX, y: initialY } = initialPosition.current;

      handler({ state: 'start', deltaX: 0, deltaY: 0, initialX, initialY, isHolding: true, event });
    },
    [handler]
  );

  const handleTouchEnd = useCallback(
    (event: SwipeAction['event']) => {
      if (!initialPosition.current) return;

      handler({
        state: 'end',
        deltaX: delta.current.x,
        deltaY: delta.current.y,
        initialX: initialPosition.current.x,
        initialY: initialPosition.current.y,
        direction: getSwipeDirection(),
        isHolding: false,
        event
      });

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
        state: 'moving',
        deltaX: delta.current.x,
        deltaY: delta.current.y,
        initialX: initialPosition.current.x,
        initialY: initialPosition.current.y,
        direction: getSwipeDirection(),
        isHolding: true,
        event
      });
    },
    [handler]
  );

  /* prettier-ignore */
  useEffect(() => {
    const { mouse = false, ...eventOptions } = options;
    if (!eventOptions.ref) eventOptions.ref = options.ref ?? targetRef.current ?? (window as any);

    const clearTouchMove = addEvents(['touchmove', mouse && 'mousemove'], handleTouchMove, eventOptions);

    const clearTouchStart = addEvents(['touchstart', mouse && 'mousedown'], handleTouchStart, eventOptions);
    const clearTouchEnd = addEvents(['touchend', 'touchcancel', mouse && 'mouseup', mouse && 'mouseleave'], handleTouchEnd, eventOptions);

    return () => {
      clearTouchMove();
      clearTouchStart();
      clearTouchEnd();
    }
  }, [options.ref]);
};
