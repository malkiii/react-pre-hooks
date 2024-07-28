import { useCallback, useState } from 'react';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useAsyncCallback | useAsyncCallback} hook.
 */
export const useAsyncCallback = <T>(callback: () => Promise<T>) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<any>();
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

  const clear = useCallback(() => {
    setData(undefined);
    setIsPending(false);
    setError(undefined);
  }, []);

  return { data, isPending, error, callback: callbackMemo, clear };
};
