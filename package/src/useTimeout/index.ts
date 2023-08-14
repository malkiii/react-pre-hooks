import { DependencyList, useCallback, useEffect, useRef } from 'react';

export const useTimeout = (callback: () => void, ms?: number, deps: DependencyList = []) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const callbackMemo = useCallback(callback, [callback]);
  const clear = (): void => timeout.current && clearTimeout(timeout.current);

  const startTimeout = () => {
    clear();
    timeout.current = setTimeout(callbackMemo, ms);
  };

  useEffect(() => {
    startTimeout();
    return clear;
  }, [ms, ...deps]);

  return { start: startTimeout, stop: clear } as const;
};
