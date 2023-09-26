import { SetStateAction, useMemo, useState } from 'react';
import deepEqual from 'fast-deep-equal';

export const useSet = <T extends any = any>(initial: Set<T> | T[] = new Set<any>()) => {
  const initialValue = new Set<T>(initial);
  const [set, setSet] = useState<Set<T>>(initialValue);
  return useMemo(
    () => ({
      value: set,
      size: set.size,
      add(...values: T[]) {
        setSet(set => {
          const copy = new Set(set);
          values.forEach(value => {
            const isExists = this.find(v => deepEqual(value, v), copy) !== undefined;
            if (!isExists) copy.add(value);
          });
          return copy;
        });
      },
      delete(...values: T[]) {
        setSet(set => {
          const copy = new Set(set);
          values.forEach(value => {
            const resolvedValue = this.find(v => deepEqual(value, v), copy);
            if (resolvedValue) copy.delete(resolvedValue);
          });
          return copy;
        });
      },
      has(...values: T[]) {
        return values.every(value => set.has(value) || this.find(v => deepEqual(value, v)));
      },
      find(callback: (value: T) => unknown, thisArg = set) {
        for (const value of thisArg) if (callback(value)) return value;
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
