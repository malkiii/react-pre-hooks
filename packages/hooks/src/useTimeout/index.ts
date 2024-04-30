import { DependencyList, useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const useTimeout = (args: {
  callback?: () => any;
  timeout: number;
  startOnMount?: boolean;
  deps?: DependencyList;
}) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const [isRunning, setIsRunning] = useState<boolean>(!!args.startOnMount);

  const callback = useCallback(() => {
    args.callback?.();
    setIsRunning(false);
  }, [args.callback]);

  const controls = useMemo(
    () => ({
      isRunning,
      start() {
        this.cancel();
        timeoutRef.current = setTimeout(callback, args.timeout);
        setIsRunning(true);
      },
      cancel() {
        if (!timeoutRef.current) return;
        setIsRunning(false);
        clearTimeout(timeoutRef.current);
      },
      toggle(force?: boolean) {
        const shouldStart = force ?? !isRunning;
        shouldStart ? this.start() : this.cancel();
      }
    }),
    [callback, isRunning]
  );

  useEffect(() => {
    if (!args.startOnMount) return;
    controls.start();
    return controls.cancel;
  }, args.deps ?? []);

  return controls;
};
