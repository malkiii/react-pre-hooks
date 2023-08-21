import { DependencyList, useCallback, useEffect, useRef, useState } from 'react';

type TimoutOptions = {
  timeout: number;
  startOnMount?: boolean;
  deps?: DependencyList;
};

export const useTimeout = (
  callback: () => any,
  { timeout, startOnMount = false, deps = [] }: TimoutOptions
) => {
  const [isRunning, setIsRunning] = useState<boolean>(startOnMount);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const callbackMemo = useCallback(() => {
    callback();
    setIsRunning(false);
  }, [callback]);

  const clear = (): void => {
    if (!timeoutRef.current) return;
    setIsRunning(false);
    clearTimeout(timeoutRef.current);
  };

  const start = () => {
    clear();
    timeoutRef.current = setTimeout(callbackMemo, timeout);
    setIsRunning(true);
  };

  useEffect(() => {
    if (!startOnMount) return;
    start();
    return clear;
  }, [timeout, startOnMount, ...deps]);

  return { start, stop: clear, isRunning } as const;
};
