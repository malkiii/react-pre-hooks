import { RefObject, useCallback, useRef } from 'react';
import { useEventListener } from '../useEventListener';
import { useNewRef } from '../utils/useNewRef';

export type PointerEventHandler = (event: PointerEvent, pointers: PointerEvent[]) => any;
export type PointerEventName<E = keyof HTMLElementEventMap> = E extends `pointer${string}`
  ? E
  : never;

const pointerEvents: PointerEventName[] = [
  'pointerup',
  'pointerdown',
  'pointermove',
  'pointerenter',
  'pointerleave',
  'pointercancel',
  'pointerout'
];

export type PointerOptions<T extends HTMLElement> = {
  ref?: RefObject<T> | null;
  capture?: boolean;
};

export const usePointers = <T extends HTMLElement = HTMLDivElement>(
  handler: PointerEventHandler,
  options: PointerOptions<T> = {}
) => {
  const targetRef = useNewRef<T>(options.ref);
  const pointersList = useRef<PointerEvent[]>([]);

  const addPointer = useCallback((event: PointerEvent) => {
    const pointerIndex = pointersList.current.findIndex(e => e.pointerId === event.pointerId);
    if (options.capture) targetRef.current?.setPointerCapture(event.pointerId);
    if (pointerIndex === -1) pointersList.current.push(event);

    pointersList.current[pointerIndex] = event;
  }, []);

  const removePointer = useCallback((event: PointerEvent) => {
    pointersList.current = pointersList.current.filter(e => e.pointerId !== event.pointerId);
  }, []);

  const handlePointerEvents = useCallback(
    (event: PointerEvent) => {
      if (event.type === 'pointerdown') addPointer(event);
      if (['pointerup', 'pointercancel'].includes(event.type)) removePointer(event);

      handler(event, pointersList.current);
    },
    [handler]
  );

  useEventListener(pointerEvents, handlePointerEvents, { ref: targetRef });

  return targetRef;
};
