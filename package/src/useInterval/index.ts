import { DependencyList, useCallback, useEffect, useRef, useState } from 'react';

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
  const [isRunning, setIsRunning] = useState<boolean>(startOnMount);

  const clear = (): void => {
    if (!intervalRef.current) return;
    setIsRunning(false);
    window.clearInterval(intervalRef.current);
  };

  const start = () => {
    clear();
    intervalRef.current = setInterval(handlerMemo, timeout);
    setIsRunning(true);
  };

  useEffect(() => {
    if (!startOnMount) return;
    start();
    return clear;
  }, [timeout, startOnMount, ...deps]);

  return { start, stop: clear, isRunning } as const;
};
