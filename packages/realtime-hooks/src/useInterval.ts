import { DependencyList, useCallback, useEffect, useRef } from 'react';

export const useInterval = (handler: Function, timeout?: number, deps: DependencyList = []) => {
  const interval = useRef<any>();

  const handlerRef = useCallback(handler, [handler]);
  const clear = (): void => interval.current && window.clearInterval(interval.current);

  const startInterval = useCallback(() => {
    clear();
    interval.current = window.setInterval(handlerRef, timeout);
  }, [timeout]);

  useEffect(() => {
    startInterval();
    return clear;
  }, [timeout, ...deps]);

  return { start: startInterval, stop: clear } as const;
};
