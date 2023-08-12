import { DependencyList, useCallback, useEffect, useState } from 'react';

export const useAsync = <T extends any>(callback: () => Promise<T>, deps: DependencyList = []) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();
  const [data, setData] = useState<T>();

  const callbackFunction = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(undefined);
    try {
      setData(await callback());
    } catch (error) {
      setError(error);
      setData(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [callback, ...deps]);

  useEffect(() => {
    callbackFunction();
  }, [callbackFunction]);

  return { data, isLoading, error, retry: callbackFunction };
};
