import { useEffect, useState } from 'react';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useDebouncedState | useDebouncedState} hook.
 */
export const useDebouncedState = <T>(args: { initial: T; delay?: number }) => {
  const [value, setValue] = useState<T>(args.initial);
  const [debouncedValue, setDebouncedValue] = useState<T>(args.initial);

  useEffect(() => {
    setValue(args.initial);
  }, [args.initial]);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), args.delay ?? 500);
    return () => clearTimeout(timeout);
  }, [value]);

  return [debouncedValue, setValue, value] as const;
};
