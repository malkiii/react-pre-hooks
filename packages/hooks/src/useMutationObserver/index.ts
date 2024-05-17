import { useEffect, useRef } from 'react';
import { useNewRef } from '../utils/useNewRef';

export type MutationObserverOptions<T extends HTMLElement> = MutationObserverInit & {
  ref?: React.RefObject<T> | null;
};

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useMutationObserver | useMutationObserver} hook.
 */
export const useMutationObserver = <T extends HTMLElement = HTMLDivElement>(
  args: MutationObserverOptions<T> & {
    handler: MutationCallback;
  }
) => {
  const targetRef = useNewRef<T>(args.ref);
  const observerRef = useRef<MutationObserver>();

  useEffect(() => {
    if (!targetRef.current) return;

    observerRef.current = new MutationObserver(args.handler);
    observerRef.current.observe(targetRef.current, args);

    return () => observerRef.current?.disconnect();
  }, [args.handler]);

  return { ref: targetRef, observerRef };
};
