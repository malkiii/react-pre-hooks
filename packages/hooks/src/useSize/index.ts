import { useCallback, useEffect, useRef, useState } from 'react';
import { ResizeOptions, useResizeObserver } from '../useResizeObserver';

export const useSize = <T extends HTMLElement = HTMLDivElement>(options: ResizeOptions<T> = {}) => {
  const { ref, ...resizeOptions } = options;

  const targetRef = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const observerHandler: ResizeObserverCallback = useCallback(entries => {
    const { width, height } = entries[0].contentRect;
    setSize({ width, height });
  }, []);

  useEffect(() => {
    // @ts-ignore
    targetRef.current = ref?.current ?? document.body;
    setSize({
      width: targetRef.current!.offsetWidth,
      height: targetRef.current!.offsetHeight
    });
  }, []);

  useResizeObserver(observerHandler, { ref: targetRef, ...resizeOptions });

  return { ref: targetRef, ...size };
};
