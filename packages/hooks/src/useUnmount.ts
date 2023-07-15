import { useEffect, useRef } from 'react';
import { useEffectOnce } from './useEffectOnce';

export const useUnmount = (callback: () => void) => {
  const callbackRef = useRef(callback);

  useEffectOnce(() => callbackRef.current);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
};
