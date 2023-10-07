import { useCallback, useEffect, useRef, useState } from 'react';

export type IntersectionObserverOptions<T extends HTMLElement> = IntersectionObserverInit & {
  target?: T | null;
  handler?: IntersectionObserverCallback;
  once?: boolean;
};

export const useIntersection = <T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverOptions<T> = {}
) => {
  const { target = null, handler, once, ...observerInit } = options;

  const ref = useRef<T>(target);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  const callbackMemo: IntersectionObserverCallback = useCallback(
    (entries, observer) => {
      const { isIntersecting } = entries[0];
      setIsIntersecting(isIntersecting);
      if (handler) handler(entries, observer);
      if (isIntersecting && once) observer.unobserve(ref.current!);
    },
    [handler]
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callbackMemo, observerInit);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return { ref, isIntersecting };
};
