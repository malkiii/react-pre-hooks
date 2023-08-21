import { SetStateAction, useState } from 'react';
import { objectEqual } from '../utils';

type DefaultObject = Record<string, unknown>;
type ObjectType<T> = keyof T extends never ? DefaultObject : T;

export const useMap = <T extends DefaultObject>(initial: ObjectType<T> = {} as any) => {
  type TObj = typeof initial;
  const [map, setMap] = useState<TObj>(initial);
  return {
    value: map,
    size: Object.keys(map).length,
    get(key: keyof TObj) {
      return key in map ? map[key] : undefined;
    },
    set<K extends keyof TObj>(key: K, value: TObj[K]) {
      setMap(obj => ({ ...obj, [key]: value }));
    },
    delete(key: keyof TObj) {
      const { [key]: _, ...rest } = map;
      setMap(rest as TObj);
    },
    has(key: keyof TObj) {
      return key in map;
    },
    keys() {
      return Object.keys(map) as (keyof TObj)[];
    },
    values() {
      return Object.values(map) as TObj[keyof TObj][];
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
    reset(obj: SetStateAction<TObj> = initial) {
      setMap(obj);
    },
    toString(spaces?: number) {
      return JSON.stringify(map, null, spaces);
    }
  };
};
