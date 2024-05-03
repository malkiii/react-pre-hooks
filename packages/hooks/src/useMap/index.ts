import { useMemo, useState } from 'react';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useMap | useMap} hook.
 */
export const useMap = <K = any, V = any>(initial?: Iterable<readonly [K, V]>) => {
  const [map, setMap] = useState(new Map(initial));
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
      copy() {
        return structuredClone(map);
      }
    }),
    [map]
  );
};
