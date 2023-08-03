import { DependencyList, useCallback, useEffect, useRef } from 'react';

export const useTimeout = (callback: () => void, ms?: number, deps: DependencyList = []) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const callbackFunction = useCallback(callback, [callback]);
  const clear = (): void => timeout.current && clearTimeout(timeout.current);

  const startTimeout = useCallback(() => {
    clear();
    timeout.current = setTimeout(callbackFunction, ms);
  }, [ms]);

  useEffect(() => {
    startTimeout();
    return clear;
  }, [ms, ...deps]);

  return { start: startTimeout, stop: clear } as const;
};
