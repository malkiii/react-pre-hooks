import { useCallback, useState } from 'react';
import { useEventListener } from '../useEventListener';
import { useIsomorphicEffect } from '../useIsomorphicEffect';

export const useStorage = <T extends any>(args: {
  type: 'local' | 'session';
  key: string;
  default?: T | null;
}) => {
  const defaultValue = args.default ?? null;
  const [storedValue, setStoredValue] = useState<T | null>(() => defaultValue);

  const getStorage = useCallback(() => (args.type === 'local' ? localStorage : sessionStorage), []);

  const getStoredValue = useCallback(() => {
    const item = getStorage().getItem(args.key);

    if (!item) return defaultValue;

    return item === 'undefined' ? null : JSON.parse(item ?? '');
  }, [args.key]);

  const updateStoredValue: typeof setStoredValue = useCallback(value => {
    const newValue = JSON.stringify(value instanceof Function ? value(storedValue) : value);

    getStorage().setItem(args.key, newValue);

    window.dispatchEvent(new StorageEvent('storage', { key: args.key, newValue }));
  }, []);

  const handleStorageChange = useCallback(
    (event: StorageEvent) => {
      if (event?.key === args.key) setStoredValue(getStoredValue());
    },
    [args.key]
  );

  useIsomorphicEffect(() => {
    setStoredValue(getStoredValue());
  }, []);

  useEventListener({
    event: 'storage',
    handler: handleStorageChange,
    target: () => window
  });

  return [storedValue, updateStoredValue] as const;
};
