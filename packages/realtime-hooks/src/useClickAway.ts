import { RefObject, useCallback } from 'react';
import { useOrCreateRef, useWindowEvents } from '.';

type ClickEvent = HTMLElementEventMap['click'];

export const useClickAway = <T extends HTMLElement = HTMLDivElement>(
  handler: (event: ClickEvent) => any,
  ref?: RefObject<T>
) => {
  const targetRef = useOrCreateRef(ref);
  const callback = useCallback(
    (event: MouseEvent) => {
      const element = targetRef.current;
      element && !element.contains(event.target as Node) && handler(event);
    },
    [handler]
  );

  useWindowEvents('click', callback);

  return {
    ref: targetRef,
    cancelEvent(event: MouseEvent) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
};
