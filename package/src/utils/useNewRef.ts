import { RefObject, useLayoutEffect, useRef } from 'react';

export const useNewRef = <T>(ref?: RefObject<T> | null) => {
  const newRef = useRef<T>(null);

  useLayoutEffect(() => {
    // @ts-ignore
    if (ref) newRef.current = ref.current;
  }, []);

  return ref ?? newRef;
};
