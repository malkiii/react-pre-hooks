import { useEffect } from 'react';

type WindowEventsHook = <E extends keyof WindowEventMap>(
  event: E | E[],
  handler: (event: WindowEventMap[E]) => any,
  options?: AddEventListenerOptions
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
