import { useCallback, useState } from 'react';
import { IntersectionObserverOptions, useIntersectionObserver } from '..';
import { useNewRef } from '../utils/useNewRef';

export type ViewOptions<T extends HTMLElement> = IntersectionObserverOptions<T> & {
  once?: boolean;
};

export const useInView = <T extends HTMLElement = HTMLDivElement>(options: ViewOptions<T> = {}) => {
  const { ref, once = false, ...observerInit } = options;

  const targetRef = useNewRef<T>(ref);
  const [isInView, setIsInView] = useState<boolean>(false);

  const handleIntersecting: IntersectionObserverCallback = useCallback((entries, observer) => {
    const { isIntersecting } = entries[0];
    if (isIntersecting && once) observer.unobserve(targetRef.current!);
    setIsInView(isIntersecting);
  }, []);

  useIntersectionObserver(handleIntersecting, { ref: targetRef, ...observerInit });

  return { ref: targetRef, isInView };
};
