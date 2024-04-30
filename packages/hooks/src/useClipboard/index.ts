import { useMemo } from 'react';
import { useTimeout } from '../useTimeout';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useClipboard | useClipboard} hook.
 */
export const useClipboard = ({ duration = 3000 } = {}) => {
  const statusTimer = useTimeout({ timeout: duration });

  const controls = useMemo(
    () => ({
      isCopied: statusTimer.isRunning,
      copy: async (text?: string | null) => {
        navigator.clipboard.writeText(text || '').then(statusTimer.start);
      },
      paste: async () => {
        try {
          return await navigator.clipboard.readText();
        } catch (error) {
          return null;
        }
      },
      reset: () => {
        statusTimer.cancel();
      }
    }),
    [statusTimer]
  );

  return controls;
};
