import { useStorage } from '../utils/useStorage';

export const useLocalStorage = <T extends any = any>(key: string, initialValue?: T) => {
  return useStorage<T>('local', key, initialValue);
};
