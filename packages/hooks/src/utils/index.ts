import { SetStateAction } from 'react';
import { EventHandler, EventListenerOptions, EventMap } from '..';

export const browserPrefixes = ['', 'moz', 'webkit', 'o', 'ms'] as const;

export function getPrefixedProperty<T extends {}, K extends keyof T & string>(obj: T, prop: K) {
  if (prop in obj) return obj[prop];

  const capitalizedProp = prop.charAt(0).toUpperCase() + prop.substring(1);
  const prefixedProps = browserPrefixes.map(pref => pref + capitalizedProp);
  const property = prefixedProps.find(p => p in obj);
  if (property) return obj[property as K];
}

export function getStateActionValue<T extends any>(state: SetStateAction<T>, value: T) {
  return state instanceof Function ? state(value) : state;
}

export function getPointerPosition(event: MouseEvent | TouchEvent | PointerEvent) {
  return event instanceof TouchEvent
    ? { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY }
    : { x: event.clientX, y: event.clientY };
}

export function addEvents<T extends EventTarget, E extends keyof EventMap<T>>(
  event: E | Array<E | false | null | undefined>,
  handler: EventHandler<T, E>,
  { ref, target, ...options }: EventListenerOptions<T> = {}
) {
  if (!ref && !target) return () => {};
  const element = ref?.current ?? (target && target());
  if (!element) return () => {};

  const addEvent = (e: string) => element.addEventListener(e, handler as any, options);
  const removeEvent = (e: string) => element.removeEventListener(e, handler as any, options);

  const hasMultipleEvents = Array.isArray(event);
  const resolvedEvents = hasMultipleEvents ? (event.filter(Boolean) as any) : [event];

  resolvedEvents.forEach(addEvent);

  return () => {
    resolvedEvents.forEach(removeEvent);
  };
}
