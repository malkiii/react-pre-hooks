import { useCallback, useEffect, useState } from 'react';

export const useMutationObserver = (callback: MutationCallback) => {
  const [mutationObserver, setMutationObserver] = useState<MutationObserver>();
  const callbackMemo = useCallback(callback, [callback]);

  useEffect(() => {
    setMutationObserver(new MutationObserver(callbackMemo));
    return () => mutationObserver?.disconnect();
  }, [callback]);

  return mutationObserver;
};
