import { DependencyList, useCallback, useEffect, useRef } from 'react';

type TimoutOptions = {
  timeout: number;
  startOnMount?: boolean;
  deps?: DependencyList;
};

export const useTimeout = (
  callback: () => any,
  { timeout, startOnMount = false, deps = [] }: TimoutOptions
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const callbackMemo = useCallback(callback, [callback]);
  const clear = (): void => timeoutRef.current && clearTimeout(timeoutRef.current);

  const startTimeout = () => {
    clear();
    timeoutRef.current = setTimeout(callbackMemo, timeout);
  };

  useEffect(() => {
    if (!startOnMount) return;
    startTimeout();
    return clear;
  }, [timeout, startOnMount, ...deps]);

  return { start: startTimeout, stop: clear } as const;
};
