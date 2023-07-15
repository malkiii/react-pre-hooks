import { Dispatch, RefObject, SetStateAction } from 'react';

export type StateSetter<T = any> = Dispatch<SetStateAction<T>>;
export type WithRef<T = HTMLElement, P = {}> = P & {
  ref?: RefObject<T>;
};
