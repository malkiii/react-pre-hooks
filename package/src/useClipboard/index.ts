import { useState } from 'react';
import { useTimeout } from '@/src';

export const useClipboard = ({ timeout = 3000 } = {}) => {
  const [error, setError] = useState<Error>();

  const statusTimer = useTimeout(() => {}, { timeout });

  return {
    copy(text?: string) {
      navigator.clipboard
        .writeText(text || '')
        .then(() => statusTimer.start())
        .catch(error => setError(error));
    },
    reset() {
      statusTimer.stop();
      setError(undefined);
    },
    copied: statusTimer.isRunning,
    error
  } as const;
};
