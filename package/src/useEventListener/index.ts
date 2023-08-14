import { useEffect } from 'react';

type EventMap<T> = T extends Window ? WindowEventMap : HTMLElementEventMap;

export const useEventListener = <
  E extends keyof EventMap<T> & string,
  T extends Document | EventTarget = Window
>(
  event: E | E[],
  handler: (event: EventMap<T>[E]) => any,
  options?: AddEventListenerOptions & { target?: T | null }
) => {
  useEffect(() => {
    const target = options?.target !== undefined ? options.target : window;
    if (!target) return;

    const addEvent = (e: string) => target.addEventListener(e, handler as any, options);
    const removeEvent = (e: string) => target.removeEventListener(e, handler as any, options);

    const hasMultipleEvents = Array.isArray(event);
    hasMultipleEvents ? event.forEach(addEvent) : addEvent(event);

    return () => {
      hasMultipleEvents ? event.forEach(removeEvent) : removeEvent(event);
    };
  }, [event, handler, options]);
};
