import { SetStateAction, useState } from 'react';

export type CounterOptions = Partial<{
  min: number;
  max: number;
  step: number;
}>;

export const useCounter = (value: number = 0, options: CounterOptions = {}) => {
  const initialValue = Math.floor(value);
  const [counter, setCounter] = useState<number>(initialValue);

  const [min, max] = [options.min, options.max];
  const counterMin = Math.min(counter, Math.floor(min != undefined ? min : -Infinity));
  const counterMax = Math.max(counter, Math.floor(max != undefined ? max : Infinity));
  const step = Math.abs(Math.floor(options.step || 1));

  return {
    value: counter,
    inc() {
      return counter < counterMax && setCounter(c => c + step);
    },
    dec() {
      return counter > counterMin && setCounter(c => c - step);
    },
    reset() {
      return setCounter(initialValue);
    },
    set(value: SetStateAction<number>) {
      return setCounter(v => {
        const resolvedValue = value instanceof Function ? value(v) : value;
        return resolvedValue > counterMax
          ? counterMax
          : resolvedValue < counterMin
          ? counterMin
          : resolvedValue;
      });
    }
  } as const;
};
