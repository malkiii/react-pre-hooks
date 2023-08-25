import { useCallback, useState } from 'react';
import { useTimeout } from '@/src';

export const useClipboard = ({ timeout = 3000 } = {}) => {
  const [error, setError] = useState<Error>();
  const statusTimer = useTimeout(() => {}, { timeout });

  const copy = useCallback(
    (text?: string) => {
      navigator.clipboard
        .writeText(text || '')
        .then(() => statusTimer.start())
        .catch(error => setError(error));
    },
    [statusTimer]
  );

  const reset = useCallback(() => {
    statusTimer.stop();
    setError(undefined);
  }, [statusTimer]);

  return { copy, reset, copied: statusTimer.isRunning, error } as const;
};
