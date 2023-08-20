import { SetStateAction, useState } from 'react';
import { NonEmptyArray } from '../types';
import { objectEqual } from '../utils';

export const useArray = <T extends any = any>(initial: T[] = []) => {
  const [value, setValue] = useState<T[]>(initial);
  const getResolvedIndex = (i: number) => parseInt(i.toString()) + (i < 0 ? value.length : 0);

  return {
    value,
    length: value.length,
    at(index: number) {
      return value.at(index);
    },
    set(index: number, element: T) {
      setValue(arr => {
        const copy = [...arr];
        copy[getResolvedIndex(index)] = element;
        return copy;
      });
    },
    has(element: T) {
      return value.includes(element);
    },
    isEqual(arr: any[]) {
      return objectEqual(value, arr);
    },
    count(element: T) {
      return value.reduce((count, num) => (objectEqual(num, element) ? count + 1 : count), 0);
    },
    push(...elements: NonEmptyArray<T>) {
      setValue(arr => [...arr, ...elements]);
    },
    pop(index: number = -1) {
      const i = getResolvedIndex(index);
      setValue(arr => [...arr.slice(0, i), ...arr.slice(i + 1)]);
      return value[i];
    },
    shift() {
      return this.pop(0);
    },
    unshift(...elements: NonEmptyArray<T>) {
      this.insert(0, ...elements);
    },
    insert(index: number, ...elements: NonEmptyArray<T>) {
      const i = getResolvedIndex(index);
      setValue(arr => [...arr.slice(0, i), ...elements, ...arr.slice(i)]);
    },
    remove(...elements: NonEmptyArray<T>) {
      setValue(arr => arr.filter(el => !elements.includes(el)));
    },
    concat(...elements: Array<T | ConcatArray<T>>) {
      setValue(arr => arr.concat(...elements));
    },
    merge(...elements: Array<T | ConcatArray<T>>) {
      setValue(arr => [...new Set(arr.concat(...elements))]);
    },
    apply(callback: Parameters<typeof value.map<T>>[0]) {
      setValue(arr => arr.map(callback));
    },
    copy() {
      return structuredClone(value);
    },
    reset(arr: SetStateAction<T[]> = initial) {
      setValue(arr);
    }
  };
};
