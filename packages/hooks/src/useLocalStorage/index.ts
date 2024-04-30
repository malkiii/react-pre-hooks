import { useStorage } from '../utils/useStorage';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useLocalStorage | useLocalStorage} hook.
 */
export const useLocalStorage = <T extends any = any>(args: { key: string; default?: T }) => {
  return useStorage<T>({ type: 'local', ...args });
};
