import { SetStateAction, useMemo, useState } from 'react';
import deepEqual from 'fast-deep-equal';

export const useMap = <K = any, V = any>(initial: Map<K, V> = new Map()) => {
  const [map, setMap] = useState(initial);
  return useMemo(
    () => ({
      value: map,
      size: map.size,
      get(key: K) {
        return map.get(key);
      },
      set(key: K, value: V) {
        setMap(m => new Map(m).set(key, value));
      },
      delete(...keys: K[]) {
        setMap(m => {
          const newMap = new Map(m);
          keys.forEach(k => newMap.delete(k));
          return newMap;
        });
      },
      has(...keys: K[]) {
        return keys.every(k => map.has(k));
      },
      keys() {
        return Array.from(map.keys());
      },
      values() {
        return Array.from(map.values());
      },
      entries() {
        return Array.from(map.entries());
      },
      clear() {
        setMap(new Map());
      },
      isEqual(m: Map<any, any>) {
        return deepEqual(map, m);
      },
      copy() {
        return structuredClone(map);
      },
      reset(value: SetStateAction<typeof map> = initial) {
        setMap(value);
      }
    }),
    [map]
  );
};
