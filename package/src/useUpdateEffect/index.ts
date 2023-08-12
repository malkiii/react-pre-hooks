import { useEffect, useRef } from 'react';

export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (!isFirstMount) return effect();
    isFirstMount.current = false;
  }, deps);
};
