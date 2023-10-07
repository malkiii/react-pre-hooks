import { useStorage } from '@/src/utils/useStorage';

export const useSessionStorage = <T extends any = any>(key: string, initialValue?: T) => {
  return useStorage<T>('sessionStorage', key, initialValue);
};
