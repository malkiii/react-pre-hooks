import { useCallback, useState } from 'react';
import { useIntersectionObserver } from '../useIntersectionObserver';
import { useNewRef } from '../utils/useNewRef';

type IntersectionObserverOptions<T extends HTMLElement> = Parameters<
  typeof useIntersectionObserver<T>
>[0];

export const useInView = <T extends HTMLElement = HTMLDivElement>(
  args: IntersectionObserverOptions<T> & {
    once?: boolean;
  }
) => {
  const targetRef = useNewRef<T>(args.ref);
  const [isInView, setIsInView] = useState<boolean>(false);

  const handleIntersecting: IntersectionObserverCallback = useCallback((entries, observer) => {
    const { isIntersecting } = entries[0];
    if (isIntersecting && args.once) observer.unobserve(targetRef.current!);
    setIsInView(isIntersecting);
  }, []);

  useIntersectionObserver({ ...args, ref: targetRef, handler: handleIntersecting });

  return { ref: targetRef, isInView };
};
