import { useState } from 'react';

type CounterOptions = {
  min: number;
  max: number;
  step: number;
};
export const useCounter = (value: number = 0, options?: Partial<CounterOptions>) => {
  const [counter, setCounter] = useState<typeof value>(Math.floor(value));
  const min = Math.min(counter, Math.floor(options?.min || -Infinity));
  const max = Math.max(counter, Math.floor(options?.max || Infinity));
  const step = Math.abs(options?.step || 1);

  return {
    value: () => counter,
    set: (value: number) => setCounter(value > max ? max : value < min ? min : value),
    inc: () => counter < max && setCounter(c => c + step),
    dec: () => counter > min && setCounter(c => c - step),
    reset: () => setCounter(Math.floor(value))
  } as const;
};
