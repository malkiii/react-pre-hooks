import { SetStateAction, useCallback, useEffect, useState } from 'react';
import { useEventListener } from '@/src';

type StorageType = 'localStorage' | 'sessionStorage';

declare global {
  interface WindowEventMap {
    'storage:local': CustomEvent;
    'storage:session': CustomEvent;
  }
}

const parseJSON = <T>(value: string | null): T | undefined => {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch {
    console.log('parsing error on', { value });
    return undefined;
  }
};

const useStorage = <T extends any>(type: StorageType, key: string, initialValue: T) => {
  const storage = type === 'localStorage' ? window.localStorage : window.sessionStorage;
  const storageEvent = type === 'localStorage' ? 'storage:local' : 'storage:session';

  const getStoredValue = useCallback((): T => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = storage.getItem(key);
      return item ? parseJSON<T>(item)! : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  // stored value state
  const [storedValue, setStoredValue] = useState<T>(getStoredValue);
  const setCurrentStoredValue = () => {
    setStoredValue(getStoredValue);
  };

  const updateStoredValue = useCallback((value: SetStateAction<T>) => {
    if (typeof window === 'undefined') {
      console.warn(`Tried setting localStorage key “${key}” even in the server`);
    }

    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      storage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);

      window.dispatchEvent(new Event(storageEvent));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  }, []);

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) return;
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
