import { useEffect, useState } from 'react';
import { useEventListener, useWindowEvents } from '@/src';

export const useViewport = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [orientation, setOrientation] = useState<OrientationType>();

  const getWindowSize = () => {
    setSize({ width: window.innerWidth || 0, height: window.innerHeight || 0 });
    setOrientation(screen.orientation.type);
  };

  useEffect(getWindowSize, []);
  useWindowEvents('resize', getWindowSize, { passive: true });
  useEventListener('change', getWindowSize, { element: screen.orientation });

  return { ...size, orientation };
};
