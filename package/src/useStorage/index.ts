import { useCallback, useEffect, useState } from 'react';
import { useEventListener } from '@/src';

type StorageType = 'localStorage' | 'sessionStorage';

declare global {
  interface WindowEventMap {
    'storage:local': CustomEvent;
    'storage:session': CustomEvent;
  }
}

const parseJSON = <T>(value: string | null): T => {
  try {
    return value === 'undefined' ? null : JSON.parse(value || '');
  } catch {
    throw new Error(`Parsing error: can't parse ${value}`);
  }
};

const useStorage = <T extends any>(type: StorageType, key: string, initialValue: T | null) => {
  const storage = type === 'localStorage' ? window.localStorage : window.sessionStorage;
  const storageEvent = type === 'localStorage' ? 'storage:local' : 'storage:session';

  const getStoredValue = useCallback(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = storage.getItem(key);
      return item ? parseJSON<T>(item) : initialValue;
    } catch (error) {
      throw new Error(`Error reading localStorage key “${key}”: ${error}`);
    }
  }, [initialValue, key]);

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
      setStoredValue(newValue);

      window.dispatchEvent(new Event(storageEvent));
    } catch (error) {
      throw new Error(`Value error: setting localStorage key “${key}” with ${value}: ${error}`);
    }
  }, []);

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      const storageKey = (event as StorageEvent)?.key;
      if (storageKey && storageKey !== key) return;
      setCurrentStoredValue();
    },
    [key, getStoredValue]
  );

  useEffect(setCurrentStoredValue, []);

  useEventListener('storage', handleStorageChange);
  useEventListener(storageEvent, handleStorageChange);

  return [storedValue, updateStoredValue] as const;
};

export const useLocalStorage = <T extends any = any>(key: string, initialValue: T) => {
  return useStorage('localStorage', key, initialValue);
};

export const useSessionStorage = <T extends any = any>(key: string, initialValue: T) => {
  return useStorage('sessionStorage', key, initialValue);
};