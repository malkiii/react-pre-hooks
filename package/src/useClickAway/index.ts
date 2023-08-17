import { RefObject, useCallback, useRef } from 'react';
import { useEventListener } from '@/src';

export const useClickAway = <T extends HTMLElement = HTMLDivElement>(
  handler: (event: MouseEvent) => any,
  ref?: RefObject<T>
) => {
  const targetRef = ref || useRef<T>(null);
  const callback = useCallback(
    (event: MouseEvent) => {
      const element = targetRef.current;
      element && !element.contains(event.target as Node) && handler(event);
    },
    [handler]
  );

  useEventListener('click', callback);

  return targetRef;
};
