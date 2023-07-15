import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

export const useSize = <T extends HTMLElement = HTMLDivElement>(ref?: RefObject<T>) => {
  const targetRef = ref || useRef<T>();
  const [size, setSize] = useState<{ width: number; height: number }>();

  const observeElement = useCallback(() => {
    const element = targetRef.current;

    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => setSize(entry.contentRect));
    });

    if (element) resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [targetRef]);

  useEffect(observeElement, [targetRef]);

  return { ref: targetRef, ...size };
};
