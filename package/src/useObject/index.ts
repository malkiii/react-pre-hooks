import { SetStateAction, useState } from 'react';
import { objectEqual } from '../utils';

type DefaultObject = Record<string, unknown>;
type ObjectType<T> = keyof T extends never ? DefaultObject : T;

export const useObject = <T extends DefaultObject>(initial: ObjectType<T> = {} as any) => {
  type TObj = typeof initial;
  const [value, setValue] = useState<TObj>(initial);
  return {
    value,
    get<K extends keyof TObj>(key: K) {
      return key in value ? value[key] : undefined;
    },
    set<K extends keyof TObj>(key: K, value: TObj[K]) {
      setValue(obj => ({ ...obj, [key]: value }));
    },
    keys() {
      return Object.keys(value) as (keyof TObj)[];
    },
    values() {
      return Object.values(value) as TObj[keyof TObj][];
    },
    entries() {
      return Object.entries(value) as { [K in keyof T]: [K, T[K]] }[keyof T][];
    },
    isEqual(obj: Record<any, any>) {
      return objectEqual(value, obj);
    },
    copy() {
      return structuredClone(value);
    },
    reset(obj: SetStateAction<TObj> = initial) {
      setValue(obj);
    },
    toString(spaces?: number) {
      return JSON.stringify(value, null, spaces);
    }
  };
};
