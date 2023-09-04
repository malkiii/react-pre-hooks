import { SetStateAction, useMemo, useState } from 'react';
import deepEqual from 'fast-deep-equal';

const copyWith = <T extends any>(set: Set<T>, callback: (set: Set<T>) => any) => {
  const copy = structuredClone(set);
  callback(copy);
  return copy;
};

export const useSet = <T extends any = any>(initial: Set<T> | T[] = new Set<any>()) => {
  const initialValue = new Set<T>(initial);
  const [set, setSet] = useState<Set<T>>(initialValue);
  return useMemo(
    () => ({
      value: set,
      size: set.size,
      add(...values: T[]) {
        setSet(set => copyWith(set, s => values.forEach(v => s.add(v))));
      },
      delete(...values: T[]) {
        setSet(set => copyWith(set, s => values.forEach(v => s.delete(v))));
      },
      has(...values: T[]) {
        return values.every(v => set.has(v));
      },
      values() {
        return Array.from(set);
      },
      isEqual(s: Set<any>) {
        return deepEqual(set, s);
      },
      union(values: Set<T> | T[]) {
        setSet(set => new Set([...set, ...values]));
      },
      clear() {
        setSet(new Set<T>());
      },
      copy() {
        return structuredClone(set);
      },
      reset(set: SetStateAction<Set<T>> = initialValue) {
        setSet(set);
      }
    }),
    [set]
  );
};
