import { useCallback, useState } from 'react';
import { useEventListener } from '../useEventListener';
import { useIsomorphicEffect } from '../useIsomorphicEffect';

export const useHash = (initial?: string) => {
  const [hash, setHash] = useState<string | undefined>(initial);

  const updateHash: typeof setHash = useCallback(value => {
    setHash(curr => {
      const newHash = (value instanceof Function ? value(curr) : value) ?? '';
      window.location.hash = newHash;
      return newHash;
    });
  }, []);

  const handleHashChange = useCallback(() => updateHash(window.location.hash), []);

  useIsomorphicEffect(() => {
    if (initial) handleHashChange();
  }, []);

  useEventListener({ event: 'hashchange', handler: handleHashChange, target: () => window });

  return [hash, updateHash] as const;
};
