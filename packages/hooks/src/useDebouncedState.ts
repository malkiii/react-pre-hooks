import { useState } from 'react';
import { useTimeout } from './useTimeout';

export const useDebouncedState = <T extends any = any>(initial: T, delay: number = 500) => {
  const [value, setValue] = useState<T>(initial);
  const [debouncedValue, setDebouncedValue] = useState<T>(initial);

  useTimeout(() => setDebouncedValue(value), delay, [value]);

  return [debouncedValue, setValue, value] as const;
};
