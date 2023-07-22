import { DependencyList, useCallback, useEffect, useRef } from 'react';

export const useTimeout = (callback: () => void, ms?: number, deps: DependencyList = []) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const callbackRef = useRef<typeof callback>(callback);

  const clear = () => timeout.current && clearTimeout(timeout.current);
  const startTimeout = useCallback(() => {
    clear();
    timeout.current = setTimeout(callbackRef.current, ms);
    return clear;
  }, [ms]);

  useEffect(startTimeout, [ms, ...deps]);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return {
    start: startTimeout,
    stop: clear
  } as const;
};
