import { RefObject, useEffect, useRef } from 'react';
import { useEventListener } from './useEventListener';

export const useClickAway = <T extends HTMLElement>(
  handler: (event: HTMLElementEventMap['click']) => any,
  ref?: RefObject<T>
) => {
  const callback = useRef((event: MouseEvent) => {
    const element = targetElementRef.current;
    element && !element.contains(event.target as any) && handler(event);
  });

  const targetElementRef = useEventListener('click', callback.current, { ref });

  useEffect(() => {
    callback.current = handler;
  }, [handler]);

  return {
    ref: targetElementRef,
    cancelEvent(event: Event) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
};
