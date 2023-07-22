import { useEffectOnce } from './useEffectOnce';
import { useUpdateEffect } from './useUpdateEffect';

export const useLogger = (...params: any[]) => {
  const log = () => {
    console.log(...params);
  };

  useEffectOnce(log);
  useUpdateEffect(log, params);
};
