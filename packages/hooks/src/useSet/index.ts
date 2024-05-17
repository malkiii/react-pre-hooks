import { useMemo, useState } from 'react';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useSet | useSet} hook.
 */
export const useSet = <T>(initial: T[] = []) => {
  const [set, setSet] = useState<Set<T>>(new Set(initial));

  return useMemo(
    () => ({
      value: set,
      size: set.size,
      add(...values: T[]) {
        setSet(set => {
          const copy = new Set(set);
          values.forEach(value => copy.add(value));
          return copy;
        });
      },
      delete(...values: T[]) {
        setSet(set => {
          const copy = new Set(set);
          values.forEach(value => copy.delete(value));
          return copy;
        });
      },
      has(...values: T[]) {
        return values.every(value => set.has(value));
      },
      find(callback: (value: T) => unknown, thisArg = set) {
        for (const value of thisArg) if (callback(value)) return value;
      },
      copy() {
        return structuredClone(set);
      },
      toArray() {
        return Array.from(set);
      },
      clear() {
        setSet(new Set<T>());
      }
    }),
    [set]
  );
};
