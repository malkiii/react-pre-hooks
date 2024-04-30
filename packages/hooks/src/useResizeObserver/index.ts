import { RefObject, useEffect, useRef } from 'react';
import { useNewRef } from '../utils/useNewRef';

export const useResizeObserver = <T extends HTMLElement = HTMLDivElement>(
  args: ResizeObserverOptions & {
    handler: ResizeObserverCallback;
    ref?: RefObject<T> | null;
  }
) => {
  const targetRef = useNewRef<T>(args.ref);
  const observer = useRef<ResizeObserver>();

  useEffect(() => {
    if (!targetRef.current) return;

    observer.current = new ResizeObserver(args.handler);
    observer.current.observe(targetRef.current, args);

    return () => observer.current?.disconnect();
  }, [args.handler]);

  return { ref: targetRef, observer };
};
