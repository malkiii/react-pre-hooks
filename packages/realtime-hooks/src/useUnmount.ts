import { useEffect, useRef } from 'react';

export const useUnmount = (callback: () => void) => {
  const callbackRef = useRef(callback);

  useEffect(() => callbackRef.current, []);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
};
