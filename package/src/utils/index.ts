import { SetStateAction } from 'react';
import { EventHandler, EventListenerOptions, EventMap } from '..';

export const browserPrefixes = ['', 'moz', 'webkit', 'o', 'ms'] as const;

export function getStateActionValue<T extends any>(state: SetStateAction<T>, value: T) {
  return state instanceof Function ? state(value) : state;
}

export function getCurrentMousePosition(event: MouseEvent | TouchEvent) {
  return event instanceof MouseEvent
    ? { x: event.clientX, y: event.clientY }
    : { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
}

export function getPrefixedProperty<T extends {}, K extends keyof T & string>(obj: T, prop: K) {
  if (prop in obj) return obj[prop];

  const capitalizedProp = prop.charAt(0).toUpperCase() + prop.substring(1);
  const prefixedProps = browserPrefixes.map(pref => pref + capitalizedProp);
  const property = prefixedProps.find(p => p in obj);
  if (property) return obj[property as K];
}

export function download(url: string, name = '') {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = name;

  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function addEvents<T extends EventTarget, E extends keyof EventMap<T> & string>(
  event: E | Array<E | false | null | undefined>,
  handler: EventHandler<T, E>,
  { ref, ...options }: EventListenerOptions<T> = {}
) {
  if (!ref) return () => {};
  const target = 'addEventListener' in ref ? ref : ref.current;
  if (!target) return () => {};

  const addEvent = (e: string) => target.addEventListener(e, handler as any, options);
  const removeEvent = (e: string) => target.removeEventListener(e, handler as any, options);

  const hasMultipleEvents = Array.isArray(event);
  const resolvedEvents = hasMultipleEvents ? (event.filter(Boolean) as any) : [event];

  resolvedEvents.forEach(addEvent);

  return () => {
    resolvedEvents.forEach(removeEvent);
  };
}
