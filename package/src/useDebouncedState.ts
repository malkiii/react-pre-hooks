import { useState } from 'react';
import { useTimeout } from '@/src';

export const useDebouncedState = <T extends any = any>(initial: T, { delay = 500 } = {}) => {
  const [value, setValue] = useState<T>(initial);
  const [debouncedValue, setDebouncedValue] = useState<T>(initial);

  useTimeout(() => setDebouncedValue(value), { timeout: delay, startOnMount: true, deps: [value] });

  return [debouncedValue, setValue, value] as const;
};
