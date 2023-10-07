import { SetStateAction, useState } from 'react';

export type CounterOptions = {
  min?: number;
  max?: number;
};

export const useCounter = (value: number = 0, options: CounterOptions = {}) => {
  const initialValue = Math.floor(value);
  const [counter, setCounter] = useState<number>(initialValue);

  const [min, max] = [options.min, options.max];
  const counterMin = Math.min(counter, Math.floor(min != undefined ? min : -Infinity));
  const counterMax = Math.max(counter, Math.floor(max != undefined ? max : Infinity));

  return {
    value: counter,
    set(value: SetStateAction<number>) {
      return setCounter(v => {
        const resolvedValue = value instanceof Function ? value(v) : value;
        return resolvedValue > counterMax
          ? counterMax
          : resolvedValue < counterMin
          ? counterMin
          : resolvedValue;
      });
    },
    inc(step: number = 1) {
      return this.set(v => v + Math.abs(Math.floor(step)));
    },
    dec(step: number = 1) {
      return this.set(v => v - Math.abs(Math.floor(step)));
    },
    reset() {
      return this.set(initialValue);
    }
  } as const;
};
