import { SetStateAction, useState } from 'react';
import { NonEmptyArray } from '../types';

export const useArray = <T extends any = any>(initial: T[] = []) => {
  const [array, setArray] = useState<T[]>(initial);
  const getResolvedIndex = (i: number) => parseInt(i.toString()) + (i < 0 ? array.length : 0);

  return {
    value: array,
    length: array.length,
    get(index: number) {
      return array.at(index);
    },
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
    push(...elements: NonEmptyArray<T>) {
      setArray(arr => [...arr, ...elements]);
    },
    pop(index: number = -1) {
      const i = getResolvedIndex(index);
      setArray(arr => [...arr.slice(0, i), ...arr.slice(i + 1)]);
      return array[i];
    },
    insert(index: number, ...elements: NonEmptyArray<T>) {
      const i = getResolvedIndex(index);
      setArray(arr => [...arr.slice(0, i), ...elements, ...arr.slice(i)]);
    },
    remove(...elements: NonEmptyArray<T>) {
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
