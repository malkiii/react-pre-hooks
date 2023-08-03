import { useEffect } from 'react';
import { useOrCreateRef } from '@/src';

export const useEventListener = <
  T extends Document | EventTarget,
  E extends keyof HTMLElementEventMap
>(
  event: E | E[],
  handler: (event: HTMLElementEventMap[E] | Event) => any,
  options?: AddEventListenerOptions & { element?: T | null }
) => {
  const targetRef = useOrCreateRef(options?.element || undefined);
  const hasMultipleEvents = Array.isArray(event);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;
    if (hasMultipleEvents) event.forEach(e => element.addEventListener(e, handler, options));
    else element.addEventListener(event, handler, options);

    return () => {
      if (hasMultipleEvents) event.forEach(e => element.removeEventListener(e, handler, options));
      else element.removeEventListener(event, handler, options);
    };
  }, [event, handler, options]);

  return targetRef;
};
