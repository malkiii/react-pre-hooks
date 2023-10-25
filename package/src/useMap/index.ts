import { SetStateAction, useMemo, useState } from 'react';
import deepEqual from 'fast-deep-equal';

type DefaultObject = Record<string, unknown>;
type ObjectType<T> = keyof T extends never ? DefaultObject : T;

export type ObjectToMap<T> = Map<keyof ObjectType<T>, ObjectType<T>[keyof ObjectType<T>]>;

export const useMap = <T extends DefaultObject>(initial: ObjectType<T> = {} as any) => {
  const [map, setMap] = useState<ObjectToMap<T>>(new Map(Object.entries(initial)) as any);
  return useMemo(
    () => ({
      value: map,
      size: map.size,
      get(key: Parameters<(typeof map)['get']>[0]) {
        return map.get(key);
      },
      set<K extends keyof ObjectType<T>>(key: K, value: ObjectType<T>[K]) {
        setMap(m => new Map(m).set(key, value));
      },
      delete(...keys: Array<keyof ObjectType<T>>) {
        setMap(m => {
          const newMap = new Map(m);
          keys.forEach(k => newMap.delete(k));
          return newMap;
        });
      },
      has(...keys: Array<keyof ObjectType<T>>) {
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
      isEqual(m: Map<any, any> | Record<string | number | symbol, any>) {
        return deepEqual(map, m instanceof Map ? m : new Map(Object.entries(m)));
      },
      copy() {
        return structuredClone(map);
      },
      reset(value: ObjectType<T> | SetStateAction<ObjectToMap<T>> = initial) {
        const isObject = typeof value === 'object' && !(value instanceof Map);
        setMap(isObject ? new Map(Object.entries(value)) : (value as any));
      },
      toObject() {
        return Object.fromEntries(map) as ObjectType<T>;
      },
      toJSON(space?: number) {
        return JSON.stringify(Object.fromEntries(map), null, space);
      }
    }),
    [map]
  );
};
