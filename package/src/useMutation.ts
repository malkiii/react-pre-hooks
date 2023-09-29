import { useEffect, useRef } from 'react';

export type MutationObserverOptions<T extends HTMLElement> = MutationObserverInit & {
  target?: T | null;
};

export const useMutation = <T extends HTMLElement = HTMLDivElement>(
  handler: MutationCallback,
  options: MutationObserverOptions<T> = {}
) => {
  const { target = null, ...observerInit } = options;

  const ref = useRef<T>(target);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new MutationObserver(handler);
    observer.observe(ref.current, observerInit);

    return () => observer.disconnect();
  }, []);

  return ref;
};
