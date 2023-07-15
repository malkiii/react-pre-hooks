import { useEffect } from 'react';

type WindowEventsHook = <K extends keyof WindowEventMap>(
  event: K | K[],
  handler: (event: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
) => void;

export const useWindowEvents: WindowEventsHook = (event, handler, options) => {
  const hasMultipleEvents = Array.isArray(event);

  useEffect(() => {
    if (hasMultipleEvents) event.forEach(e => window.addEventListener(e, handler, options));
    else window.addEventListener(event, handler, options);

    return () => {
      if (hasMultipleEvents) event.forEach(e => window.removeEventListener(e, handler, options));
      else window.removeEventListener(event, handler, options);
    };
  }, [event, handler, options]);
};
