import { SetStateAction, useMemo, useState } from 'react';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useArray | useArray} hook.
 */
export const useArray = <T>(initial: T[] = []) => {
  const [array, setArray] = useState<T[]>(initial);

  return useMemo(
    () => ({
      array,
      length: array.length,
      get(index: number) {
        return array.at(index);
      },
      set(index: number, element: T) {
        setArray(arr => arr.toSpliced(index, 1, element));
      },
      has(...elements: T[]) {
        return elements.every(value => array.includes(value));
      },
      count(element: T) {
        return array.reduce((acc, value) => (value === element ? acc + 1 : acc), 0);
      },
      push(...elements: T[]) {
        setArray(arr => arr.toSpliced(arr.length, 0, ...elements));
      },
      pop(index: number = -1) {
        setArray(arr => arr.toSpliced(index, 1));
        return array.at(index);
      },
      shift() {
        return this.pop(0);
      },
      unshift(...elements: T[]) {
        this.insert(0, ...elements);
      },
      insert(index: number, ...elements: T[]) {
        setArray(arr => arr.toSpliced(index, 0, ...elements));
      },
      reset(value: SetStateAction<T[]> = initial) {
        setArray(value);
      }
    }),
    [array]
  );
};
