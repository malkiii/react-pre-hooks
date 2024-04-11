import { RefObject, useEffect, useRef } from 'react';

export const useNewRef = <T>(ref?: RefObject<T> | null) => {
  const newRef = useRef<T>(null);

  useEffect(() => {
    // @ts-ignore
    if (ref) newRef.current = ref.current;
  }, []);

  return ref ?? newRef;
};
