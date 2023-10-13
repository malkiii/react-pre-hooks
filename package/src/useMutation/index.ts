import { RefObject, useEffect, useRef } from 'react';

export type MutationObserverOptions<T extends HTMLElement> = MutationObserverInit & {
  ref?: RefObject<T> | null;
};

export const useMutation = <T extends HTMLElement = HTMLDivElement>(
  handler: MutationCallback,
  options: MutationObserverOptions<T> = {}
) => {
  const { ref, ...observerInit } = options;

  const targetRef = ref ?? useRef<T>(null);

  useEffect(() => {
    if (!targetRef.current) return;
    const observer = new MutationObserver(handler);
    observer.observe(targetRef.current, observerInit);

    return () => observer.disconnect();
  }, []);

  return targetRef;
};
