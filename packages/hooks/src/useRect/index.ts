import { useCallback, useState } from 'react';
import { useIsomorphicEffect } from '../useIsomorphicEffect';
import { useResizeObserver } from '../useResizeObserver';
import { useNewRef } from '../utils/useNewRef';

type ResizeOptions<T extends HTMLElement> = Parameters<typeof useResizeObserver<T>>[0];

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useRect | useRect} hook.
 */
export const useRect = <T extends HTMLElement = HTMLDivElement>(args: ResizeOptions<T>) => {
  const targetRef = useNewRef<T>(args.ref);
  const [rect, setRect] = useState<DOMRect>();

  const updateRect = useCallback(() => {
    setRect(targetRef.current!.getBoundingClientRect());
  }, []);

  useIsomorphicEffect(() => {
    updateRect();
  }, []);

  useResizeObserver({ ...args, ref: targetRef, handler: updateRect });

  return { ref: targetRef, rect };
};
