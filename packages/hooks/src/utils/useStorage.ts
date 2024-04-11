import { useCallback, useState } from 'react';
import { useEventListener, useIsomorphicEffect } from '..';

const parseJSON = <T>(value: string | null): T => {
  try {
    return value === 'undefined' ? null : JSON.parse(value || '');
  } catch {
    throw new Error(`Parsing error: can't parse ${value}`);
  }
};

export const useStorage = <T extends any>(
  type: 'local' | 'session',
  key: string,
  initialValue: T | null = null
) => {
  const [storedValue, setStoredValue] = useState<T | null>(initialValue ?? null);
  const setCurrentStoredValue = () => setStoredValue(getStoredValue);

  const getStorage = useCallback(() => (type === 'local' ? localStorage : sessionStorage), []);

  const getStoredValue = useCallback(() => {
    const storage = getStorage();

    try {
      const item = storage.getItem(key);
      return item ? parseJSON<T>(item) : initialValue;
    } catch (error) {
      throw new Error(`Error reading localStorage key “${key}”: ${error}`);
    }
  }, [key]);

  const updateStoredValue: typeof setStoredValue = useCallback(value => {
    const storage = getStorage();

    try {
      const newValue = JSON.stringify(value instanceof Function ? value(storedValue) : value);
      storage.setItem(key, newValue);

      window.dispatchEvent(new StorageEvent('storage', { key, newValue }));
    } catch (error) {
      throw new Error(`Value error: setting localStorage key “${key}” with ${value}: ${error}`);
    }
  }, []);

  const handleStorageChange = useCallback(
    (event: StorageEvent) => {
      if (event?.key === key) setCurrentStoredValue();
    },
    [key]
  );

  useIsomorphicEffect(() => {
    setCurrentStoredValue();
  }, []);

  useEventListener('storage', handleStorageChange, { target: () => window });

  return [storedValue, updateStoredValue] as const;
};
