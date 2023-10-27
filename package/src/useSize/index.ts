import { RefObject, useEffect, useRef, useState } from 'react';

export type SizeObserverOptions<T extends HTMLElement> = ResizeObserverOptions & {
  ref?: RefObject<T> | null;
  handler?: ResizeObserverCallback;
};

export const useSize = <T extends HTMLElement = HTMLDivElement>(
  options: SizeObserverOptions<T> = {}
) => {
  const { ref, handler } = options;
  const targetRef = ref ?? useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const target = targetRef.current ?? document.body;
    setSize({ width: target.offsetWidth, height: target.offsetHeight });

    const resizeObserver = new ResizeObserver((entries, observer) => {
      if (handler) handler(entries, observer);
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });

    resizeObserver.observe(target, options);

    return () => resizeObserver.disconnect();
  }, [options.ref]);

  return { ref: targetRef, ...size };
};
