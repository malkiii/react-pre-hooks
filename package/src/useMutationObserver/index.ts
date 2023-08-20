import { useEffect, useState } from 'react';

export const useMutationObserver = (callback: MutationCallback) => {
  const [mutationObserver, setMutationObserver] = useState<MutationObserver>();

  useEffect(() => {
    setMutationObserver(new MutationObserver(callback));
    return () => mutationObserver?.disconnect();
  }, [callback]);

  return mutationObserver;
};
