import { useEffect, useRef, useState } from 'react';

export type SizeObserverOptions<T extends HTMLElement> = ResizeObserverOptions & {
  target?: T | null;
};

export const useSize = <T extends HTMLElement = HTMLDivElement>(
  options: SizeObserverOptions<T> = {}
) => {
  const ref = useRef<T>(options.target ?? null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const target = ref.current ?? document.body;
    setSize({ width: target.offsetWidth, height: target.offsetHeight });

    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => setSize(entry.contentRect));
    });

    resizeObserver.observe(target, options);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { ref, ...size };
};
