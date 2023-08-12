import { RefObject, useCallback, useEffect, useState } from 'react';
import { useOrCreateRef } from '@/src/utils/hooks/useOrCreateRef';

export const useSize = <T extends HTMLElement = HTMLDivElement>(ref?: RefObject<T>) => {
  const targetRef = useOrCreateRef(ref);
  const [size, setSize] = useState<{ width: number; height: number }>();

  const observeElement = useCallback(() => {
    if (!targetRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => setSize(entry.contentRect));
    });

    resizeObserver.observe(targetRef.current);

    return () => resizeObserver.disconnect();
  }, [targetRef]);

  useEffect(observeElement, [observeElement]);

  return { ref: targetRef, ...size };
};
