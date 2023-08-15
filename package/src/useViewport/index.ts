import { useEffect, useRef } from 'react';
import { useEventListener } from '@/src';

export const useViewport = () => {
  const viewport = useRef({ width: 0, height: 0 });
  const orientation = useRef<OrientationType>();

  const getWindowSize = () => {
    viewport.current = { width: window.innerWidth || 0, height: window.innerHeight || 0 };
    orientation.current = screen.orientation.type;
  };

  useEffect(getWindowSize, []);
  useEventListener('resize', getWindowSize, { passive: true });
  useEventListener('change', getWindowSize, { target: screen.orientation });

  return { ...viewport.current, orientation: orientation.current };
};
