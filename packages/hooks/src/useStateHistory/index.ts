import { useCallback, useMemo, useRef, useState } from 'react';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useStateHistory | useStateHistory} hook.
 */
export const useStateHistory = <T>(initial: T, { limit = 10 } = {}) => {
  if (limit <= 0) throw new Error(`useStateHistory: Limit must be grater than 0, got ${limit}`);

  const [value, setValue] = useState<T>(initial);
  const historyRef = useRef<T[]>([value]);
  const pointerRef = useRef<number>(0);

  const getPointerValue = () => historyRef.current[pointerRef.current];
  const updateHistory = () => setValue(getPointerValue);

  const setState = useCallback(
    (value: React.SetStateAction<T>) => {
      setValue(currentValue => {
        const resolvedValue = value instanceof Function ? value(currentValue) : value;
        if (getPointerValue() === resolvedValue) return resolvedValue;

        if (pointerRef.current < historyRef.current.length - 1) {
          historyRef.current.splice(pointerRef.current + 1);
        }
        historyRef.current.push(resolvedValue);
        historyRef.current.splice(0, historyRef.current.length - limit);

        pointerRef.current = historyRef.current.length - 1;

        return resolvedValue;
      });
    },
    [limit, value]
  );

  const pointer = useMemo(
    () => ({
      history: historyRef.current,
      position: pointerRef.current,
      go(step: number) {
        const lastIndex = historyRef.current.length - 1;
        const nextPointer = pointerRef.current + step;
        pointerRef.current =
          nextPointer < 0 ? 0 : nextPointer > lastIndex ? lastIndex : nextPointer;
        updateHistory();
      },
      next() {
        if (pointerRef.current >= historyRef.current.length - 1) return;
        pointerRef.current++;
        updateHistory();
      },
      prev() {
        if (pointerRef.current <= 0) return;
        pointerRef.current--;
        updateHistory();
      },
      reset() {
        pointerRef.current = historyRef.current.length - 1;
        updateHistory();
      },
      clear() {
        pointerRef.current = 0;
        historyRef.current = [];
        updateHistory();
      }
    }),
    [value]
  );

  return [value, setState, pointer] as const;
};
