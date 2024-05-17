import { useState } from 'react';
import { useIsomorphicEffect } from '../useIsomorphicEffect';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useOrientation | useOrientation} hook.
 */
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
