import { useState } from 'react';
import { useIsomorphicEffect } from '../useIsomorphicEffect';

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>();

  useIsomorphicEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handleQueryChange = () => {
      setMatches(mediaQueryList.matches);
    };

    handleQueryChange();

    mediaQueryList.addEventListener('change', handleQueryChange);
    return () => mediaQueryList.removeEventListener('change', handleQueryChange);
  }, []);

  return matches;
};
