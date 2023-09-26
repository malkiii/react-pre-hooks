import { useCallback, useEffect, useState } from 'react';
import { useEventListener } from '@/src';

export const useViewport = () => {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [orientation, setOrientation] = useState<OrientationType>();

  const getWindowSize = useCallback(() => {
    setViewport({ width: window.innerWidth || 0, height: window.innerHeight || 0 });
    setOrientation(screen.orientation.type);
  }, []);

  useEffect(getWindowSize, []);
  useEventListener('change', getWindowSize, { target: screen.orientation });
  useEventListener('resize', getWindowSize, { target: window, passive: true });

  return { ...viewport, orientation };
};
