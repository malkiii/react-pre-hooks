import { Dispatch, MutableRefObject, RefObject, SetStateAction } from 'react';

export type StateSetter<T = any> = Dispatch<SetStateAction<T>>;
export type WithRef<P = {}, T = HTMLDivElement> = P & {
  ref?: RefObject<T> | MutableRefObject<T>;
};
