import { useCallback, useState } from 'react';
import { IntersectionObserverOptions, useIntersectionObserver } from '../useIntersectionObserver';
import { useNewRef } from '../utils/useNewRef';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useInView | useInView} hook.
 */
export const useInView = <T extends HTMLElement = HTMLDivElement>(
  args: IntersectionObserverOptions<T> & {
    once?: boolean;
  }
) => {
  const targetRef = useNewRef<T>(args.ref);
  const [isInView, setIsInView] = useState<boolean>(false);

  const handleIntersecting: IntersectionObserverCallback = useCallback((entries, observer) => {
    const { isIntersecting } = entries[0]!;
    if (isIntersecting && args.once) observer.unobserve(targetRef.current!);
    setIsInView(isIntersecting);
  }, []);

  useIntersectionObserver({ ...args, ref: targetRef, handler: handleIntersecting });

  return { ref: targetRef, isInView };
};
