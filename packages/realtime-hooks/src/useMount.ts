import { useEffectOnce } from './useEffectOnce';

export const useMount = (callback: () => void) => {
  useEffectOnce(callback);
};
