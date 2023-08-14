import { RefObject, useCallback } from 'react';
import { useEventListener } from '@/src';

export const useClickAway = <T extends HTMLElement = HTMLDivElement>(
  targetRef: RefObject<T>,
  handler: (event: MouseEvent) => any
) => {
  const callback = useCallback(
    (event: MouseEvent) => {
      const element = targetRef.current;
      element && !element.contains(event.target as Node) && handler(event);
    },
    [handler]
  );

  useEventListener('click', callback);
};
