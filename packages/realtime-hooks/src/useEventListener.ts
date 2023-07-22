import { useEffect, useRef } from 'react';
import type { WithRef } from './types';

export const useEventListener = <T extends HTMLElement, K extends keyof HTMLElementEventMap>(
  event: K | K[],
  handler: (event: HTMLElementEventMap[K]) => any,
  options?: boolean | WithRef<AddEventListenerOptions, T>
) => {
  const ref = (typeof options !== 'boolean' && options?.ref) || useRef<T>();
  const hasMultipleEvents = Array.isArray(event);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (hasMultipleEvents) event.forEach(e => element.addEventListener(e, handler, options));
    else element.addEventListener(event, handler, options);

    return () => {
      if (hasMultipleEvents) event.forEach(e => element.removeEventListener(e, handler, options));
      else element.removeEventListener(event, handler, options);
    };
  }, [event, handler, options]);

  return ref;
};
