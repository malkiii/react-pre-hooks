import { DependencyList, useEffect, useMemo, useRef, useState } from 'react';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useInterval | useInterval} hook.
 */
export const useInterval = (args: {
  callback: () => any;
  timeout: number;
  startOnMount?: boolean;
  deps?: DependencyList;
}) => {
  const intervalRef = useRef<any>();
  const [isRunning, setIsRunning] = useState<boolean>(!!args.startOnMount);

  const controls = useMemo(
    () => ({
      isRunning,
      start() {
        this.stop();
        intervalRef.current = setInterval(args.callback, args.timeout);
        setIsRunning(true);
      },
      stop() {
        if (!intervalRef.current) return;
        setIsRunning(false);
        window.clearInterval(intervalRef.current);
      },
      toggle(force?: boolean) {
        const shouldStart = force ?? !isRunning;
        shouldStart ? this.start() : this.stop();
      }
    }),
    [args.callback, isRunning]
  );

  useEffect(() => {
    if (!args.startOnMount) return;
    controls.start();
    return controls.stop;
  }, args.deps ?? []);

  return controls;
};
