import { useMemo, useState } from 'react';

export const useCounter = (args: { initial?: number; min?: number; max?: number } = {}) => {
  const initialValue = Math.floor(args.initial ?? 0);
  const [counter, setCounter] = useState<number>(initialValue);

  const counterMin = Math.min(counter, Math.floor(args.min ?? -Infinity));
  const counterMax = Math.max(counter, Math.floor(args.max ?? Infinity));

  const methods = useMemo(
    () => ({
      value: counter,
      inc(step: number = 1) {
        this.set(v => v + Math.abs(Math.floor(step)));
      },
      dec(step: number = 1) {
        this.set(v => v - Math.abs(Math.floor(step)));
      },
      set(value: React.SetStateAction<number>) {
        setCounter(v => {
          const resolvedValue = value instanceof Function ? value(v) : value;
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
