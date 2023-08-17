import { RefObject } from 'react';

export type NonEmptyArray<T> = [T, ...T[]];
export type WithRef<P = {}, T = HTMLElement> = P & {
  ref?: RefObject<T>;
};
