import { useCallback, useEffect, useState } from 'react';

export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const [intersectionObserver, setIntersectionObserver] = useState<IntersectionObserver>();
  const callbackMemo = useCallback(callback, [callback]);

  useEffect(() => {
    setIntersectionObserver(new IntersectionObserver(callbackMemo, options));
    return () => intersectionObserver?.disconnect();
  }, [options]);

  return intersectionObserver;
};
