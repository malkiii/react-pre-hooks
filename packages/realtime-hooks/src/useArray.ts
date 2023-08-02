import { useState } from 'react';

export const useArray = <T extends any = any>(initial: T[] = []) => {
  const [array, setArray] = useState<Array<T>>(initial);
  return {
    length: array.length,
    value: array,
    at: array.at,
    set(index: number, element: T) {
      const resolvedIndex = Math.floor(index + (index < 0 ? array.length : 0));
      setArray(arr => arr.map((el, i) => (i == resolvedIndex ? element : el)));
    },
    push(element: T) {
      setArray(arr => [...arr, element]);
    },
    pop(index = array.length - 1) {
      if (index == -1) index = array.length - 1;
      setArray(arr => [...arr.slice(0, index), ...arr.slice(index + 1, arr.length)]);
      return array[index];
    },
    insert(index: number, element: T) {
      setArray(arr => [...arr.slice(0, index), element, ...arr.slice(index + 1, arr.length)]);
    },
    concat(...elements: Array<T | T[]>) {
      setArray(arr => arr.concat(elements.flat() as T[]));
    },
    merge(...elements: Array<T | T[]>) {
      setArray(arr => [...new Set(arr.concat(elements.flat() as T[]))]);
    },
    filter(callback: (value: T, index: number, array: T[]) => any) {
      setArray(arr => arr.filter(callback));
    },
    sort(fn?: (a: T, b: T) => number) {
      setArray(this.copy().sort(fn));
    },
    reverse() {
      setArray(this.copy().reverse());
    },
    copy() {
      return [...array];
    },
    reset(arr: T[] = []) {
      setArray(arr);
    }
  } as const;
};
