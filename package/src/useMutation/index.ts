import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

export type MutationObserverOptions = MutationObserverInit & {
  callback?: MutationCallback;
};

export const useMutationObserver = <T extends HTMLElement = HTMLDivElement>(
  ref?: RefObject<T>,
  options: MutationObserverOptions = {}
) => {
  const { callback, ...observerInit } = options;

  const targetRef = ref || useRef<T>(null);
  const [mutations, setMutations] = useState<MutationRecord[]>();

  const callbackMemo: MutationCallback = useCallback(
    (mutations, observer) => {
      setMutations(mutations);
      if (callback) callback(mutations, observer);
    },
    [callback]
  );

  useEffect(() => {
    if (!targetRef.current) return;
    const observer = new MutationObserver(callbackMemo);
    observer.observe(targetRef.current, observerInit);

    return () => observer.disconnect();
  }, [callback]);

  return { targetRef, mutations };
};
