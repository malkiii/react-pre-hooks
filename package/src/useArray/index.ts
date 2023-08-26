import { SetStateAction, useState } from 'react';
import { objectEqual } from '@/src/utils';

type NonEmptyArray<T> = [T, ...T[]];
type MapParameters<T> = Parameters<Parameters<T[]['map']>[0]>;

const toSpliced = <T extends any>(arr: T[], ...args: Parameters<T[]['splice']>) => {
  const copy = structuredClone(arr);
  copy.splice(...args);
  return copy;
};

export const useArray = <T extends any = any>(initial: T[] = []) => {
  const [array, setArray] = useState<T[]>(initial);
  return {
    values: array,
    length: array.length,
    at(index: number) {
      return array.at(index);
    },
    set(index: number, element: T) {
      setArray(arr => toSpliced(arr, index, 1, element));
    },
    has(element: T) {
      return array.includes(element);
    },
    isEqual(arr: any[]) {
      return objectEqual(array, arr);
    },
    count(element: T) {
      return array.reduce((count, num) => (objectEqual(num, element) ? count + 1 : count), 0);
    },
    push(...elements: NonEmptyArray<T>) {
      setArray(arr => toSpliced(arr, arr.length, 0, ...elements));
    },
    pop(index: number = -1) {
      setArray(arr => toSpliced(arr, index, 1));
      return array.at(index);
    },
    shift() {
      return this.pop(0);
    },
    unshift(...elements: NonEmptyArray<T>) {
      this.insert(0, ...elements);
    },
    insert(index: number, ...elements: NonEmptyArray<T>) {
      setArray(arr => toSpliced(arr, index, 0, ...elements));
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
    apply(callback: (...args: MapParameters<T>) => T | void) {
      setArray(arr => arr.map(callback).filter(value => value !== undefined) as T[]);
    },
    copy() {
      return structuredClone(array);
    },
    reset(arr: SetStateAction<T[]> = initial) {
      setArray(arr);
    }
  };
};
