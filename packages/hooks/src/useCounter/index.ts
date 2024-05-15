import { useMemo, useState } from 'react';
import { getStateActionValue } from '../utils';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useCounter | useCounter} hook.
 */
export const useCounter = (args: { initial?: number; min?: number; max?: number } = {}) => {
  const initialValue = Math.floor(args.initial ?? 0);
  const [counter, setCounter] = useState<number>(initialValue);

  const counterMin = Math.min(counter, args.min ?? -Infinity);
  const counterMax = Math.max(counter, args.max ?? Infinity);

  const methods = useMemo(
    () => ({
      value: counter,
      inc(step: React.SetStateAction<number> = 1) {
        this.set(v => v + getStateActionValue(step, v));
      },
      dec(step: React.SetStateAction<number> = 1) {
        this.set(v => v - getStateActionValue(step, v));
      },
      set(value: React.SetStateAction<number>) {
        setCounter(v => {
          const resolvedValue = getStateActionValue(value, v);
          return resolvedValue > counterMax
            ? counterMax
            : resolvedValue < counterMin
              ? counterMin
              : resolvedValue;
        });
      },
      reset() {
        this.set(initialValue);
      }
    }),
    [counter]
  );

  return methods;
};
