import { useLayoutEffect, useState } from 'react';

export const useDebouncedState = <T extends any = any>(initial: T, { delay = 500 } = {}) => {
  const [value, setValue] = useState<T>(initial);
  const [debouncedValue, setDebouncedValue] = useState<T>(initial);

  useLayoutEffect(() => {
    setValue(initial);
  }, [initial]);

  useLayoutEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value]);

  return [debouncedValue, setValue, value] as const;
};
