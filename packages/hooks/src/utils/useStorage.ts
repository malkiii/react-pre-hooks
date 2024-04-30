import { useCallback, useState } from 'react';
import { useEventListener } from '../useEventListener';
import { useIsomorphicEffect } from '../useIsomorphicEffect';

export const useStorage = <T extends any>(args: {
  type: 'local' | 'session';
  key: string;
  default?: T | null;
}) => {
  const defaultValue = args.default ?? null;
  const [storedValue, setStoredValue] = useState<T | null>(defaultValue);
  const setCurrentStoredValue = () => setStoredValue(getStoredValue);

  const getStorage = useCallback(() => (args.type === 'local' ? localStorage : sessionStorage), []);

  const getStoredValue = useCallback(() => {
    const storage = getStorage();

    const item = storage.getItem(args.key);
    return item ? (item === 'undefined' ? null : JSON.parse(item ?? '')) : defaultValue;
  }, [args.key]);

  const updateStoredValue: typeof setStoredValue = useCallback(value => {
    const storage = getStorage();

    const newValue = JSON.stringify(value instanceof Function ? value(storedValue) : value);
    storage.setItem(args.key, newValue);

    window.dispatchEvent(new StorageEvent('storage', { key: args.key, newValue }));
  }, []);

  const handleStorageChange = useCallback(
    (event: StorageEvent) => {
      if (event?.key === args.key) setCurrentStoredValue();
    },
    [args.key]
  );

  useIsomorphicEffect(() => {
    setCurrentStoredValue();
  }, []);

  useEventListener({ event: 'storage', handler: handleStorageChange, target: () => window });

  return [storedValue, updateStoredValue] as const;
};
