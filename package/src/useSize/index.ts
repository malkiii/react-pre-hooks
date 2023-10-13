import { RefObject, useEffect, useRef, useState } from 'react';

export type SizeObserverOptions<T extends HTMLElement> = ResizeObserverOptions & {
  ref?: RefObject<T> | null;
};

export const useSize = <T extends HTMLElement = HTMLDivElement>(
  options: SizeObserverOptions<T> = {}
) => {
  const targetRef = options.ref ?? useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const target = targetRef.current ?? document.body;
    setSize({ width: target.offsetWidth, height: target.offsetHeight });

    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => setSize(entry.contentRect));
    });

    resizeObserver.observe(target, options);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { ref: targetRef, ...size };
};
