import { useEffect } from 'react';

export type EventMap<T extends EventTarget> = T extends Window
  ? WindowEventMap
  : T extends Document
  ? DocumentEventMap
  : T extends HTMLElement
  ? HTMLElementEventMap
  : GlobalEventHandlersEventMap;

export type EventHandler<T extends EventTarget, E extends keyof EventMap<T>> = (
  event: EventMap<T>[E]
) => any;

export type EventListenerOptions<T extends EventTarget> = AddEventListenerOptions & {
  target?: T | null | undefined;
};

export const useEventListener = <T extends EventTarget, E extends keyof EventMap<T> & string>(
  event: E | Array<E | false | null | undefined>,
  handler: EventHandler<T, E>,
  options: EventListenerOptions<T>
) => {
  const { target, ...eventOptions } = options;

  useEffect(() => {
    if (!target) return;

    const addEvent = (e: E) => target.addEventListener(e, handler as any, eventOptions);
    const removeEvent = (e: E) => target.removeEventListener(e, handler as any, eventOptions);

    const hasMultipleEvents = Array.isArray(event);
    const resolvedEvents = hasMultipleEvents ? (event.filter(Boolean) as E[]) : [event];

    resolvedEvents.forEach(addEvent);

    return () => {
      resolvedEvents.forEach(removeEvent);
    };
  }, [target]);
};
