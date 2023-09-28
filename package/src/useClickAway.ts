import { useCallback, useRef } from 'react';
import { useEventListener } from '@/src';

export type ClickAwayOptions<T extends HTMLElement> = {
  target?: T | null;
};

export const useClickAway = <T extends HTMLElement = HTMLDivElement>(
  handler: (event: MouseEvent) => any,
  options: ClickAwayOptions<T> = {}
) => {
  const ref = useRef<T>(options.target ?? null);
  const callback = useCallback(
    (event: MouseEvent) => {
      const element = ref.current;
      element && !element.contains(event.target as Node) && handler(event);
    },
    [handler]
  );

  useEventListener('click', callback, { target: window });

  return ref;
};
