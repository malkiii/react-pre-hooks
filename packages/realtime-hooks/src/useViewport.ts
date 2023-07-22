import { useEffect, useState } from 'react';
import { useWindowEvents } from './useWindowEvents';

export const useViewport = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const getWindowSize = () => {
    setSize({ width: window.innerWidth || 0, height: window.innerHeight || 0 });
  };

  useEffect(getWindowSize, []);
  useWindowEvents(['resize', 'orientationchange'], getWindowSize, { passive: true });

  return size;
};
