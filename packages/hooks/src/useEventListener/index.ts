import { RefObject, useEffect } from 'react';

type EventMap<T extends EventTarget> = T extends Window
  ? WindowEventMap
  : T extends Document
    ? DocumentEventMap
    : T extends HTMLElement
      ? HTMLElementEventMap
      : GlobalEventHandlersEventMap;

type EventHandler<T extends EventTarget, E extends keyof EventMap<T>> = (
  event: EventMap<T>[E]
) => any;

type Falsy = false | null | undefined;

export const useEventListener = <T extends EventTarget, E extends keyof EventMap<T> & string>(
  args: AddEventListenerOptions & {
    event: E | Array<E | Falsy>;
    handler: EventHandler<T, E>;
    ref?: RefObject<T>;
    target?: () => T | Falsy;
  }
) => {
  useEffect(() => {
    if (!args.ref && !args.target) return;

    const element = args.ref?.current ?? args.target?.();
    if (!element) return;

    const resolvedEvents = Array.isArray(args.event)
      ? (args.event.filter(Boolean) as E[])
      : [args.event];

    resolvedEvents.forEach(e => element.addEventListener(e, args.handler as any, args));

    return () => {
      resolvedEvents.forEach(e => element.removeEventListener(e, args.handler as any, args));
    };
  }, [args.handler]);
};
