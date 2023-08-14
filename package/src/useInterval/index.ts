import { DependencyList, useCallback, useEffect, useRef } from 'react';

export const useInterval = (handler: Function, timeout?: number, deps: DependencyList = []) => {
  const interval = useRef<any>();

  const handlerMemo = useCallback(handler, [handler]);
  const clear = (): void => interval.current && window.clearInterval(interval.current);

  const startInterval = () => {
    clear();
    interval.current = window.setInterval(handlerMemo, timeout);
  };

  useEffect(() => {
    startInterval();
    return clear;
  }, [timeout, ...deps]);

  return { start: startInterval, stop: clear } as const;
};
