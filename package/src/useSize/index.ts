import { RefObject, useCallback, useEffect, useRef } from 'react';

export const useSize = <T extends HTMLElement = HTMLDivElement>(ref?: RefObject<T>) => {
  const targetRef = ref || useRef<T>(null);
  const size = useRef({ width: 0, height: 0 });

  const observeElement = useCallback(() => {
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => (size.current = entry.contentRect));
    });

    resizeObserver.observe(targetRef.current || document.body);

    return () => resizeObserver.disconnect();
  }, [targetRef]);

  useEffect(observeElement, [observeElement]);

  return { targetRef, ...size.current };
};
