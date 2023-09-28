import { SetStateAction, useMemo, useState } from 'react';
import deepEqual from 'fast-deep-equal';

type DefaultObject = Record<string, unknown>;
type ObjectType<T> = keyof T extends never ? DefaultObject : T;

export const useMap = <T extends DefaultObject>(initial: ObjectType<T> = {} as any) => {
  type TMap = typeof initial;
  const [map, setMap] = useState<TMap>(initial);
  return useMemo(
    () => ({
      value: map,
      size: Object.keys(map).length,
      get(key: keyof TMap) {
        return key in map ? map[key] : undefined;
      },
      set<K extends keyof TMap>(key: K, value: TMap[K]) {
        setMap(obj => ({ ...obj, [key]: value }));
      },
      delete(...keys: (keyof TMap)[]) {
        const newEntries = Object.entries(map).map<any>(([k, _]) => !keys.includes(k));
        setMap(Object.fromEntries(newEntries) as TMap);
      },
      has(...keys: (keyof TMap)[]) {
        return keys.every(k => k in map);
      },
      keys() {
        return Object.keys(map) as (keyof TMap)[];
      },
      values() {
        return Object.values(map) as TMap[keyof TMap][];
      },
      entries() {
        return Object.entries(map) as { [K in keyof T]: [K, T[K]] }[keyof T][];
      },
      isEqual(obj: Record<any, any>) {
        return deepEqual(map, obj);
      },
      copy() {
        return structuredClone(map);
      },
      reset(value: SetStateAction<TMap> = initial) {
        setMap(value);
      },
      toJSON(spaces?: number) {
        return JSON.stringify(map, null, spaces);
      }
    }),
    [map]
  );
};
