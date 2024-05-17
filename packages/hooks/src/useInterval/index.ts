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
  const [isActive, setIsActive] = useState<boolean>(!!args.startOnMount);

  const controls = useMemo(
    () => ({
      isActive,
      start() {
        this.stop();
        intervalRef.current = setInterval(args.callback, args.timeout);
        setIsActive(true);
      },
      stop() {
        if (!intervalRef.current) return;
        setIsActive(false);
        window.clearInterval(intervalRef.current);
      },
      toggle(force?: boolean) {
        const shouldStart = force ?? !isActive;
        shouldStart ? this.start() : this.stop();
      }
    }),
    [args.callback, isActive]
  );

  useEffect(() => {
    if (!args.startOnMount) return;
    controls.start();
    return controls.stop;
  }, args.deps ?? []);

  return controls;
};
