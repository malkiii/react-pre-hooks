import { useCallback, useRef } from 'react';
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

export const usePointers = <T extends HTMLElement = HTMLDivElement>(args: {
  handler: PointerEventHandler;
  ref?: React.RefObject<T> | null;
  capture?: boolean;
}) => {
  const targetRef = useNewRef<T>(args.ref);
  const pointersList = useRef<PointerEvent[]>([]);

  const addPointer = useCallback((event: PointerEvent) => {
    const pointerIndex = pointersList.current.findIndex(e => e.pointerId === event.pointerId);

    if (args.capture) targetRef.current?.setPointerCapture(event.pointerId);
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

      args.handler(event, pointersList.current);
    },
    [args.handler]
  );

  useEventListener({ event: pointerEvents, handler: handlePointerEvents, ref: targetRef });

  return targetRef;
};
