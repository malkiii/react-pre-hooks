import { RefObject, useCallback, useState } from 'react';
import { useEventListener } from '..';
import { useNewRef } from '../utils/useNewRef';

export const useScrolling = <T extends HTMLElement = HTMLDivElement>(ref?: RefObject<T> | null) => {
  const targetRef = useNewRef<T>(ref);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const handleScrolling = useCallback((event: Event) => {
    setIsScrolling(event.type === 'scroll');
  }, []);

  useEventListener(['scroll', 'scrollend'], handleScrolling, {
    target: () => targetRef.current ?? window
  });

  return { ref: targetRef, isScrolling };
};
