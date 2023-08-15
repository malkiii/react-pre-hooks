import { DependencyList, useCallback, useEffect, useRef } from 'react';

type IntervalOptions = {
  timeout: number;
  startOnMount?: boolean;
  deps?: DependencyList;
};

export const useInterval = (
  handler: Function,
  { timeout, startOnMount = false, deps = [] }: IntervalOptions
) => {
  const intervalRef = useRef<any>();

  const handlerMemo = useCallback(handler, [handler]);
  const clear = (): void => intervalRef.current && window.clearInterval(intervalRef.current);

  const startInterval = () => {
    clear();
    intervalRef.current = setInterval(handlerMemo, timeout);
  };

  useEffect(() => {
    if (!startOnMount) return;
    startInterval();
    return clear;
  }, [timeout, startOnMount, ...deps]);

  return { start: startInterval, stop: clear } as const;
};
