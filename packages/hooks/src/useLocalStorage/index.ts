import { useStorage } from '../utils/useStorage';

export const useLocalStorage = <T extends any = any>(args: { key: string; default?: T }) => {
  return useStorage<T>({ type: 'local', ...args });
};
