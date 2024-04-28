import { useCallback, useState } from 'react';
import { useTimeout } from '../useTimeout';

export const useClipboard = ({ duration = 3000 } = {}) => {
  const [error, setError] = useState<unknown>();
  const statusTimer = useTimeout(() => {}, { timeout: duration });

  const copy = useCallback(
    async (text?: string) => {
      try {
        await navigator.clipboard.writeText(text || '');
        statusTimer.start();
      } catch (error) {
        setError(error);
      }
    },
    [statusTimer]
  );

  const paste = useCallback(async () => {
    try {
      return await navigator.clipboard.readText();
    } catch (error) {
      setError(error);
    }
  }, []);

  const reset = useCallback(() => {
    statusTimer.cancel();
    setError(undefined);
  }, [statusTimer]);

  return { copy, paste, reset, isCopied: statusTimer.isRunning, error } as const;
};
