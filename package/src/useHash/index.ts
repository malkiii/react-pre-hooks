import { useCallback, useState } from 'react';
import { useEventListener, useIsomorphicEffect } from '..';

export const useHash = (initialValue?: string) => {
  const [hash, setHash] = useState<string | undefined>(initialValue);

  const updateHash: typeof setHash = useCallback(value => {
    setHash(curr => {
      const newHash = (value instanceof Function ? value(curr) : value) ?? '';
      window.location.hash = newHash;
      return newHash;
    });
  }, []);

  const handleHashChange = useCallback(() => updateHash(window.location.hash), []);

  useIsomorphicEffect(() => {
    if (initialValue) handleHashChange();
  }, []);

  useEventListener('hashchange', handleHashChange, { target: window });

  return [hash, updateHash] as const;
};
