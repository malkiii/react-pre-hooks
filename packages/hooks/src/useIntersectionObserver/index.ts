import { useEffect, useRef } from 'react';
import { useNewRef } from '../utils/useNewRef';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useIntersectionObserver | useIntersectionObserver} hook.
 */
export const useIntersectionObserver = <T extends HTMLElement = HTMLDivElement>(
  args: Omit<IntersectionObserverInit, 'root'> & {
    handler: IntersectionObserverCallback;
    root?: () => Element | Document | null;
    ref?: React.RefObject<T> | null;
  }
) => {
  const targetRef = useNewRef<T>(args.ref);
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    if (!targetRef.current) return;

    const root = args.root?.();
    observerRef.current = new IntersectionObserver(args.handler, { ...args, root });
    observerRef.current.observe(targetRef.current);

    return () => observerRef.current?.disconnect();
  }, [args.handler]);

  return { ref: targetRef, observerRef };
};
