import { useCallback, useLayoutEffect, useState } from 'react';
import { useEventListener } from '..';

const parseJSON = <T>(value: string | null): T => {
  try {
    return value === 'undefined' ? null : JSON.parse(value || '');
  } catch {
    throw new Error(`Parsing error: can't parse ${value}`);
  }
};

export const useStorage = <T extends any>(
  type: 'localStorage' | 'sessionStorage',
  key: string,
  initialValue: T | null = null
) => {
  const storage = type === 'localStorage' ? window.localStorage : window.sessionStorage;

  const getStoredValue = useCallback(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = storage.getItem(key);
      return item ? parseJSON<T>(item) : initialValue;
    } catch (error) {
      throw new Error(`Error reading localStorage key “${key}”: ${error}`);
    }
  }, [key]);

  // stored value state
  const [storedValue, setStoredValue] = useState<T | null>(getStoredValue);
  const setCurrentStoredValue = () => setStoredValue(getStoredValue);

  const updateStoredValue: typeof setStoredValue = useCallback(value => {
    if (typeof window === 'undefined') return;

    try {
      const newValue = JSON.stringify(value instanceof Function ? value(storedValue) : value);
      storage.setItem(key, newValue);

      window.dispatchEvent(new StorageEvent('storage', { key, newValue }));
    } catch (error) {
      throw new Error(`Value error: setting localStorage key “${key}” with ${value}: ${error}`);
    }
  }, []);

  const handleStorageChange = useCallback(
    (event: StorageEvent) => event?.key === key && setCurrentStoredValue(),
    [key, getStoredValue]
  );

  useLayoutEffect(() => {
    setCurrentStoredValue();
  }, []);

  useEventListener('storage', handleStorageChange, { ref: window });

  return [storedValue, updateStoredValue] as const;
};
