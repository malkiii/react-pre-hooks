import { useCallback, useState } from 'react';

export const useAsync = <T extends any>(callback: () => Promise<T>) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();
  const [data, setData] = useState<T>();

  const callbackMemo = useCallback(async () => {
    if (isPending) return;
    setIsPending(true);
    setError(undefined);
    try {
      setData(await callback());
    } catch (error) {
      setError(error);
    } finally {
      setIsPending(false);
    }
  }, [callback, isPending]);

  return { data, isPending, error, callback: callbackMemo };
};
