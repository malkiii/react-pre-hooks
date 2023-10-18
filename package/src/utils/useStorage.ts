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

  const updateStoredValue = useCallback((value: Parameters<typeof setStoredValue>[0]) => {
    if (typeof window === 'undefined') {
      console.warn(`Tried setting localStorage key “${key}” even in the server`);
    }

    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      storage.setItem(key, JSON.stringify(newValue));

      window.dispatchEvent(new StorageEvent('storage', { key }));
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
