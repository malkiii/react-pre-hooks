import { RefObject, useEffect, useRef } from 'react';
import { useNewRef } from '../utils/useNewRef';

export type ResizeOptions<T extends HTMLElement> = ResizeObserverOptions & {
  ref?: RefObject<T> | null;
};

export const useResizeObserver = <T extends HTMLElement = HTMLDivElement>(
  handler: ResizeObserverCallback,
  options: ResizeOptions<T> = {}
) => {
  const targetRef = useNewRef<T>(options.ref);
  const observer = useRef<ResizeObserver>();

  useEffect(() => {
    if (!targetRef.current) return;

    observer.current = new ResizeObserver(handler);
    observer.current.observe(targetRef.current, options);

    return () => observer.current?.disconnect();
  }, [handler]);

  return { ref: targetRef, observer };
};
