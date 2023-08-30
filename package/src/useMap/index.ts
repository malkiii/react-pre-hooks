import { SetStateAction, useMemo, useState } from 'react';
import { objectEqual } from '@/src/utils';

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
      delete(key: keyof TMap) {
        const { [key]: _, ...rest } = map;
        setMap(rest as TMap);
      },
      has(key: keyof TMap) {
        return key in map;
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
        return objectEqual(map, obj);
      },
      copy() {
        return structuredClone(map);
      },
      reset(obj: SetStateAction<TMap> = initial) {
        setMap(obj);
      },
      toString(spaces?: number) {
        return JSON.stringify(map, null, spaces);
      }
    }),
    [map]
  );
};
