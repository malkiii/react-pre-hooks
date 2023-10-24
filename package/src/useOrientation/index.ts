import { useEffect, useState } from 'react';
import { addEvents } from '../utils';

export const useOrientation = () => {
  const [orientation, setOrientation] = useState<OrientationType>();

  useEffect(() => {
    const getOrientation = () => setOrientation(screen.orientation.type);

    getOrientation();
    return addEvents('change', getOrientation, { ref: screen.orientation, passive: true });
  }, []);

  return orientation;
};
