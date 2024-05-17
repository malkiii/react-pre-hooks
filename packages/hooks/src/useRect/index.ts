import { useCallback, useState } from 'react';
import { useResizeObserver } from '../useResizeObserver';
import { useNewRef } from '../utils/useNewRef';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useRect | useRect} hook.
 */
export const useRect = <T extends HTMLElement = HTMLDivElement>(
  ref?: React.RefObject<T> | null
) => {
  const targetRef = useNewRef<T>(ref);
  const [rect, setRect] = useState<DOMRect>();

  const updateRect = useCallback(() => {
    setRect(targetRef.current!.getBoundingClientRect());
  }, []);

  useResizeObserver({ ref: targetRef, handler: updateRect });

  return { ref: targetRef, rect };
};
