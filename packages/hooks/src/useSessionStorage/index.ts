import { useStorage } from '../utils/useStorage';

export const useSessionStorage = <T extends any = any>(args: { key: string; default?: T }) => {
  return useStorage<T>({ type: 'session', ...args });
};
