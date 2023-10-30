import { RefObject, useEffect, useRef } from 'react';
import { useNewRef } from '../utils/useNewRef';

export type IntersectionObserverOptions<T extends HTMLElement> = IntersectionObserverInit & {
  ref?: RefObject<T> | null;
};

export const useIntersectionObserver = <T extends HTMLElement = HTMLDivElement>(
  handler: IntersectionObserverCallback,
  options: IntersectionObserverOptions<T> = {}
) => {
  const targetRef = useNewRef<T>(options.ref);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (!targetRef.current) return;

    observer.current = new IntersectionObserver(handler, options);
    observer.current.observe(targetRef.current);

    return () => observer.current?.disconnect();
  }, [handler]);

  return { ref: targetRef, observer };
};
