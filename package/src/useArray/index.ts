import { SetStateAction, useState } from 'react';

export const useArray = <T extends any = any>(initial: T[] = []) => {
  const [array, setArray] = useState<T[]>(initial);
  const getResolvedIndex = (i: number) => parseInt(i.toString()) + (i < 0 ? array.length : 0);

  return {
    value: array,
    length: array.length,
    get: array.at,
    set(index: number, element: T) {
      setArray(arr => {
        const copy = [...arr];
        copy[getResolvedIndex(index)] = element;
        return copy;
      });
    },
    has(element: T) {
      return array.includes(element);
    },
    push(...elements: T[]) {
      setArray(arr => [...arr, ...elements]);
    },
    pop(index?: number) {
      const i = getResolvedIndex(index || array.length - 1);
      setArray(arr => [...arr.slice(0, i), ...arr.slice(i + 1)]);
      return array[i];
    },
    insert(index: number, ...elements: T[]) {
      const i = getResolvedIndex(index);
      setArray(arr => [...arr.slice(0, i), ...elements, ...arr.slice(i)]);
    },
    remove(...elements: T[]) {
      setArray(arr => arr.filter(el => !elements.includes(el)));
    },
    concat(...elements: Array<T | ConcatArray<T>>) {
      setArray(arr => arr.concat(...elements));
    },
    merge(...elements: Array<T | ConcatArray<T>>) {
      setArray(arr => [...new Set(arr.concat(...elements))]);
    },
    copy() {
      return [...array];
    },
    reset(arr: SetStateAction<T[]> = []) {
      setArray(arr);
    }
  };
};
