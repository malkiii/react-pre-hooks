import { useCallback, useState } from 'react';
import { useTimeout } from '@/src';

export const useClipboard = ({ duration = 3000 } = {}) => {
  const [error, setError] = useState<Error>();
  const statusTimer = useTimeout(() => {}, { timeout: duration });

  const copy = useCallback(
    (text?: string) => {
      navigator.clipboard
        .writeText(text || '')
        .then(() => statusTimer.start())
        .catch(setError);
    },
    [statusTimer]
  );

  const reset = useCallback(() => {
    statusTimer.cancel();
    setError(undefined);
  }, [statusTimer]);

  return { copy, reset, isCopied: statusTimer.isRunning, error } as const;
};
