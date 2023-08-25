import { useEffect } from 'react';

type FalsyValue = false | null | undefined;
export type EventMap<T> = T extends Window ? WindowEventMap : HTMLElementEventMap;
export type EventHandler<T, E extends keyof EventMap<T>> = (event: EventMap<T>[E]) => any;
export type EventListenerOptions<T> = AddEventListenerOptions & { target?: T | null };

export const useEventListener = <
  E extends keyof EventMap<T> & string,
  T extends EventTarget = Window
>(
  event: E | Array<E | FalsyValue>,
  handler: EventHandler<T, E>,
  options?: EventListenerOptions<T>
) => {
  useEffect(() => {
    const target = options?.target !== undefined ? options.target : window;
    if (!target) return;

    const addEvent = (e: string) => target.addEventListener(e, handler as any, options);
    const removeEvent = (e: string) => target.removeEventListener(e, handler as any, options);

    const hasMultipleEvents = Array.isArray(event);
    const resolvedEvents = hasMultipleEvents ? (event.filter(Boolean) as E[]) : [event];

    resolvedEvents.forEach(addEvent);

    return () => {
      resolvedEvents.forEach(removeEvent);
    };
  }, [event, handler, options]);
};
