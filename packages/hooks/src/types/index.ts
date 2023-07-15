import { Dispatch, RefObject, SetStateAction } from 'react';

export type StateSetter<T = any> = Dispatch<SetStateAction<T>>;
export type WithRef<P = {}, T = HTMLElement> = P & {
  ref?: RefObject<T>;
};
