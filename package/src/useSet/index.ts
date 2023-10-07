import { SetStateAction, useMemo, useState } from 'react';
import deepEqual from 'fast-deep-equal';

type IterationParameters<T> = Parameters<Parameters<T[]['map']>[0]>;

const removeDuplicateObjects = <T extends any>(set: Set<T> | T[]) => {
  const newSet = new Set<T>();
  set.forEach(value => {
    if (newSet.has(value)) return;
    for (const v of newSet) if (deepEqual(value, v)) return;
    newSet.add(value);
  });
  return newSet;
};

export const useSet = <T extends any = any>(initial: T[] = []) => {
  const [set, setSet] = useState<Set<T>>(() => removeDuplicateObjects(initial));
  return useMemo(
    () => ({
      value: set,
      size: set.size,
      add(...values: T[]) {
        setSet(set => {
          const copy = new Set(set);
          values.forEach(value => {
            const isExists =
              set.has(value) || this.find(v => deepEqual(value, v), copy) !== undefined;
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
      toArray<U extends any = T>(callback?: (...args: IterationParameters<T>) => U): U[] {
        const array = Array.from(set);
        return callback ? array.map(callback) : (array as any);
      },
      clear() {
        setSet(new Set<T>());
      },
      isEqual(s: Set<any>) {
        return deepEqual(set, s);
      },
      copy() {
        return structuredClone(set);
      },
      reset(value: T[] | SetStateAction<Set<T>> = initial) {
        setSet(set => removeDuplicateObjects(value instanceof Function ? value(set) : value));
      }
    }),
    [set]
  );
};
