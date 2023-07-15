import { useState, useEffect } from 'react';
import { useWindowEvents } from './useWindowEvents';

export const useViewport = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const getWindowSize = () => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(getWindowSize, []);
  useWindowEvents(['resize', 'orientationchange'], getWindowSize, { passive: true });

  return size;
};
