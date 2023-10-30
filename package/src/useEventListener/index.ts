import { RefObject, useEffect } from 'react';
import { addEvents } from '../utils';

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
  ref?: T | RefObject<T> | null;
};

export const useEventListener: typeof addEvents = (event, handler, options = {}): any => {
  useEffect(() => addEvents(event, handler, options), [handler]);
};
