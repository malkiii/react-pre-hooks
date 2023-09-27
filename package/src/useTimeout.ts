import { DependencyList, useCallback, useEffect, useRef, useState } from 'react';

export type TimoutOptions = {
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

  const cancel = (): void => {
    if (!timeoutRef.current) return;
    setIsRunning(false);
    clearTimeout(timeoutRef.current);
  };

  const start = () => {
    cancel();
    timeoutRef.current = setTimeout(callbackMemo, timeout);
    setIsRunning(true);
  };

  const toggle = (force?: boolean) => {
    const shouldStart = force ?? !isRunning;
    shouldStart ? start() : cancel();
  };

  useEffect(() => {
    if (!startOnMount) return;
    start();
    return cancel;
  }, [timeout, startOnMount, ...deps]);

  return { start, cancel, toggle, isRunning } as const;
};
