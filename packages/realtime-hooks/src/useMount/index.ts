import { useEffectOnce } from '@/src';

export const useMount = (callback: () => void) => {
  useEffectOnce(callback);
};
