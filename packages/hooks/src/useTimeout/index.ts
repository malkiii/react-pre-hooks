import { DependencyList, useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useTimeout | useTimeout} hook.
 */
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
        controls.cancel();
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
        shouldStart ? controls.start() : controls.cancel();
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
