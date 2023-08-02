import { useCallback, useEffect } from 'react';

export const useUnmount = (callback: () => any) => {
  const callbackFunction = useCallback(callback, [callback]);

  useEffect(() => callbackFunction, []);
};
