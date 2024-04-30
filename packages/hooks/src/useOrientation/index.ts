import { useState } from 'react';
import { useIsomorphicEffect } from '../useIsomorphicEffect';

export const useOrientation = () => {
  const [orientation, setOrientation] = useState<OrientationType>();

  useIsomorphicEffect(() => {
    const getOrientation = () => setOrientation(screen.orientation.type);

    getOrientation();

    window.addEventListener('orientationchange', getOrientation, { passive: true });
    return () => window.removeEventListener('orientationchange', getOrientation);
  }, []);

  return orientation;
};
