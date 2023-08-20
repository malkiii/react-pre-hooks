import { useEffect, useState } from 'react';

export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const [intersectionObserver, setIntersectionObserver] = useState<IntersectionObserver>();

  useEffect(() => {
    setIntersectionObserver(new IntersectionObserver(callback, options));
    return () => intersectionObserver?.disconnect();
  }, [callback, options]);

  return intersectionObserver;
};
