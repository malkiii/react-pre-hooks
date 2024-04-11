import { RefObject, useEffect, useRef } from 'react';
import { useNewRef } from '../utils/useNewRef';

export type MutationObserverOptions<T extends HTMLElement> = MutationObserverInit & {
  ref?: RefObject<T> | null;
};

export const useMutationObserver = <T extends HTMLElement = HTMLDivElement>(
  handler: MutationCallback,
  options: MutationObserverOptions<T> = {}
) => {
  const targetRef = useNewRef<T>(options.ref);
  const observer = useRef<MutationObserver>();

  useEffect(() => {
    if (!targetRef.current) return;

    observer.current = new MutationObserver(handler);
    observer.current.observe(targetRef.current, options);

    return () => observer.current?.disconnect();
  }, [handler]);

  return { ref: targetRef, observer };
};
