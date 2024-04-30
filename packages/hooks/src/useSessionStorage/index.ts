import { useStorage } from '../utils/useStorage';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useSessionStorage | useSessionStorage} hook.
 */
export const useSessionStorage = <T extends any = any>(args: { key: string; default?: T }) => {
  return useStorage<T>({ type: 'session', ...args });
};
