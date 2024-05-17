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
  const [isActive, setIsActive] = useState<boolean>(!!args.startOnMount);

  const callback = useCallback(() => {
    args.callback?.();
    setIsActive(false);
  }, [args.callback]);

  const controls = useMemo(
    () => ({
      isActive,
      start() {
        controls.cancel();
        timeoutRef.current = setTimeout(callback, args.timeout);
        setIsActive(true);
      },
      cancel() {
        if (!timeoutRef.current) return;
        setIsActive(false);
        clearTimeout(timeoutRef.current);
      },
      toggle(force?: boolean) {
        const shouldStart = force ?? !isActive;
        shouldStart ? controls.start() : controls.cancel();
      }
    }),
    [callback, isActive]
  );

  useEffect(() => {
    if (!args.startOnMount) return;
    controls.start();
    return controls.cancel;
  }, args.deps ?? []);

  return controls;
};
