import { useEffectOnce, useUpdateEffect } from '@/src';

export const useLogger = (...params: any[]) => {
  const log = () => {
    console.log(...params);
  };

  useEffectOnce(log);
  useUpdateEffect(log, params);
};
