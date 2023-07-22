import { useCallback, useRef, useState } from 'react';
import { StateSetter } from './types';

export const useStateHistory = <T extends any>(initial: T, limit = 10) => {
  if (limit <= 0) throw new Error(`useStateHistory: Limit must be grater than 0, got ${limit}`);

  const [value, setValue] = useState<typeof initial>(initial);
  const historyRef = useRef<Array<typeof value>>([value]);
  const pointerRef = useRef<number>(0);

  const getPointerValue = () => historyRef.current[pointerRef.current];
  const setHistory = () => setValue(getPointerValue);

  const setState = useCallback(
    (v: T | ((prev?: T) => T)) => {
      setValue(currentValue => {
        const resolvedValue = v instanceof Function ? v(currentValue) : v;
        if (getPointerValue() === resolvedValue) return resolvedValue;

        if (pointerRef.current < historyRef.current.length - 1) {
          historyRef.current.splice(pointerRef.current + 1);
        }
        historyRef.current.push(resolvedValue);
        historyRef.current = historyRef.current.splice(0, historyRef.current.length - limit);

        const overflow = historyRef.current.length - limit;
        historyRef.current = historyRef.current.slice(overflow > 0 ? overflow : 0);
        pointerRef.current = historyRef.current.length - 1;
        return resolvedValue;
      });
    },
    [limit, value]
  ) as StateSetter<T>;

  const pointer = {
    history: historyRef.current,
    position: pointerRef.current,
    go(step: number) {
      const lastIndex = historyRef.current.length - 1;
      const nextPointer = pointerRef.current + step;
      pointerRef.current = nextPointer < 0 ? 0 : nextPointer > lastIndex ? lastIndex : nextPointer;
      setHistory();
    },
    next() {
      if (pointerRef.current >= historyRef.current.length - 1) return;
      pointerRef.current++;
      setHistory();
    },
    prev() {
      if (pointerRef.current <= 0) return;
      pointerRef.current--;
      setHistory();
    },
    reset() {
      pointerRef.current = historyRef.current.length - 1;
      setHistory();
    },
    clear() {
      historyRef.current = [value];
      pointerRef.current = 0;
      setHistory();
    }
  };

  return [value, setState, pointer] as const;
};
