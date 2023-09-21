import { useStorage } from '@/src/utils/useStorage';

export const useLocalStorage = <T extends any = any>(key: string, initialValue?: T) => {
  return useStorage<T>('localStorage', key, initialValue);
};
