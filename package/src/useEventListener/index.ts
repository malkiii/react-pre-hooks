import { useEffect } from 'react';

type FalsyValue = false | null | undefined;
type EventMap<T> = T extends Window ? WindowEventMap : HTMLElementEventMap;

export const useEventListener = <
  E extends keyof EventMap<T> & string,
  T extends EventTarget = Window
>(
  event: E | Array<E | FalsyValue>,
  handler: (event: EventMap<T>[E]) => any,
  options?: AddEventListenerOptions & { target?: T | null }
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
