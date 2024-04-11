import { RefObject, useEffect, useRef } from 'react';
import { useNewRef } from '../utils/useNewRef';

export type IntersectionObserverOptions<T extends HTMLElement> = Omit<
  IntersectionObserverInit,
  'root'
> & {
  container?: () => Element | Document | null;
  ref?: RefObject<T> | null;
};

export const useIntersectionObserver = <T extends HTMLElement = HTMLDivElement>(
  handler: IntersectionObserverCallback,
  options: IntersectionObserverOptions<T> = {}
) => {
  const { ref, container, ...observerInit } = options;

  const targetRef = useNewRef<T>(options.ref);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (!targetRef.current) return;

    const root = container ? container() : undefined;
    observer.current = new IntersectionObserver(handler, { ...observerInit, root });
    observer.current.observe(targetRef.current);

    return () => observer.current?.disconnect();
  }, [handler]);

  return { ref: targetRef, observer };
};
