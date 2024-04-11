import { SetStateAction, useMemo, useState } from 'react';

export type CounterOptions = {
  min?: number;
  max?: number;
};

export const useCounter = (value: number = 0, options: CounterOptions = {}) => {
  const initialValue = Math.floor(value);
  const [counter, setCounter] = useState<number>(initialValue);

  const { min = -Infinity, max = Infinity } = options;
  const counterMin = Math.min(counter, Math.floor(min));
  const counterMax = Math.max(counter, Math.floor(max));

  const methods = useMemo(
    () => ({
      value: counter,
      set(value: SetStateAction<number>) {
        setCounter(v => {
          const resolvedValue = value instanceof Function ? value(v) : value;
          return resolvedValue > counterMax
            ? counterMax
            : resolvedValue < counterMin
            ? counterMin
            : resolvedValue;
        });
      },
      inc(step: number = 1) {
        this.set(v => v + Math.abs(Math.floor(step)));
      },
      dec(step: number = 1) {
        this.set(v => v - Math.abs(Math.floor(step)));
      },
      reset() {
        this.set(initialValue);
      }
    }),
    [counter]
  );

  return methods;
};
