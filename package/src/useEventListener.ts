import { useEffect } from 'react';

type FalsyValue = false | null | undefined;
export type EventMap<T> = T extends Window ? WindowEventMap : HTMLElementEventMap;
export type EventHandler<T, E extends keyof EventMap<T>> = (event: EventMap<T>[E]) => any;
export type EventListenerOptions<T> = AddEventListenerOptions & { target?: T | null };

export const useEventListener = <T extends EventTarget, E extends keyof EventMap<T> & string>(
  event: E | Array<E | FalsyValue>,
  handler: EventHandler<T, E>,
  options: EventListenerOptions<T> = {}
) => {
  const { target, ...eventOptions } = options;

  useEffect(() => {
    if (!target) return;

    const addEvent = (e: string) => target.addEventListener(e, handler as any, eventOptions);
    const removeEvent = (e: string) => target.removeEventListener(e, handler as any, eventOptions);

    const hasMultipleEvents = Array.isArray(event);
    const resolvedEvents = hasMultipleEvents ? (event.filter(Boolean) as E[]) : [event];

    resolvedEvents.forEach(addEvent);

    return () => {
      resolvedEvents.forEach(removeEvent);
    };
  }, [event, handler, options]);
};
