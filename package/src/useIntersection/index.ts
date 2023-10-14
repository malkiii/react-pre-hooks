import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

export type IntersectionObserverOptions<T extends HTMLElement> = IntersectionObserverInit & {
  ref?: RefObject<T> | null;
  handler?: IntersectionObserverCallback;
  once?: boolean;
};

export const useIntersection = <T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverOptions<T> = {}
) => {
  const { ref, handler, once, ...observerInit } = options;

  const targetRef = ref ?? useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  const callbackMemo: IntersectionObserverCallback = useCallback(
    (entries, observer) => {
      const { isIntersecting } = entries[0];
      setIsIntersecting(isIntersecting);
      if (handler) handler(entries, observer);
      if (isIntersecting && once) observer.unobserve(targetRef.current!);
    },
    [handler]
  );

  useEffect(() => {
    if (!targetRef.current) return;
    const observer = new IntersectionObserver(callbackMemo, observerInit);
    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [ref]);

  return { ref: targetRef, isIntersecting };
};
