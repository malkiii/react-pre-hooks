import { useCallback, useEffect, useRef, useState } from 'react';

export type IntersectionObserverOptions<T extends HTMLElement> = IntersectionObserverInit & {
  target?: T | null;
  callback?: IntersectionObserverCallback;
  once?: boolean;
};

export const useIntersectionObserver = <T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverOptions<T> = {}
) => {
  const { target = null, callback, once, ...observerInit } = options;

  const ref = useRef<T>(target);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  const callbackMemo: IntersectionObserverCallback = useCallback(
    (entries, observer) => {
      const { isIntersecting } = entries[0];
      setIsIntersecting(isIntersecting);
      if (callback) callback(entries, observer);
      if (isIntersecting && once) observer.unobserve(ref.current!);
    },
    [options]
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callbackMemo, observerInit);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [callbackMemo]);

  return { ref, isIntersecting };
};
