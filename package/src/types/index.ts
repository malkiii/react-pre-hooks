import { Dispatch, MutableRefObject, RefObject, SetStateAction } from 'react';

export type NonEmptyArray<T> = [T, ...T[]];

export type StateSetter<T = any> = Dispatch<SetStateAction<T>>;
export type WithRef<P = {}, T = HTMLElement> = P & {
  ref?: RefObject<T> | MutableRefObject<T>;
};
