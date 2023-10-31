import { useEffect, useState } from 'react';
import { addEvents } from '../utils';

export const useViewport = () => {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const getWindowSize = () => {
      setViewport({ width: window.innerWidth ?? 0, height: window.innerHeight ?? 0 });
    };

    getWindowSize();
    return addEvents('resize', getWindowSize, { target: window, passive: true });
  }, []);

  return viewport;
};
