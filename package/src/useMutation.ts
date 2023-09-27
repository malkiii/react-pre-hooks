import { useCallback, useEffect, useRef, useState } from 'react';

export type MutationObserverOptions<T extends HTMLElement> = MutationObserverInit & {
  target?: T | null;
  callback?: MutationCallback;
};

export const useMutationObserver = <T extends HTMLElement = HTMLDivElement>(
  options: MutationObserverOptions<T> = {}
) => {
  const { target = null, callback, ...observerInit } = options;

  const ref = useRef<T>(target);
  const [mutations, setMutations] = useState<MutationRecord[]>();

  const callbackMemo: MutationCallback = useCallback(
    (mutations, observer) => {
      setMutations(mutations);
      if (callback) callback(mutations, observer);
    },
    [callback]
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new MutationObserver(callbackMemo);
    observer.observe(ref.current, observerInit);

    return () => observer.disconnect();
  }, [callback]);

  return { ref, mutations };
};
