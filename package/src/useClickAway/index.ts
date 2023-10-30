import { RefObject, useCallback, useRef } from 'react';
import { useEventListener } from '..';
import { useNewRef } from '../utils/useNewRef';

export type ClickAwayOptions<T extends HTMLElement> = {
  ref?: RefObject<T> | null;
};

export const useClickAway = <T extends HTMLElement = HTMLDivElement>(
  handler: (event: MouseEvent) => any,
  options: ClickAwayOptions<T> = {}
) => {
  const targetRef = useNewRef<T>(options.ref);
  const callback = useCallback(
    (event: MouseEvent) => {
      const element = targetRef.current;
      element && !element.contains(event.target as Node) && handler(event);
    },
    [handler]
  );

  useEventListener('click', callback, { ref: window });

  return targetRef;
};
