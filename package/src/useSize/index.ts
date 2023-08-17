import { RefObject, useEffect, useRef, useState } from 'react';

export const useSize = <T extends HTMLElement = HTMLDivElement>(ref?: RefObject<T>) => {
  const targetRef = ref || useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const target = targetRef.current || document.body;
    setSize({ width: target.offsetWidth, height: target.offsetHeight });

    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => setSize(entry.contentRect));
    });

    resizeObserver.observe(target);

    return () => resizeObserver.disconnect();
  }, [targetRef]);

  return { targetRef, ...size };
};
