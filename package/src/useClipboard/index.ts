import { useState } from 'react';
import { useTimeout } from '@/src';

export const useClipboard = ({ timeout = 3000 } = {}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  const statusTimer = useTimeout(() => setCopied(false), { timeout });

  return {
    copy(text?: string) {
      navigator.clipboard
        .writeText(text || '')
        .then(() => {
          statusTimer.start();
          setCopied(true);
        })
        .catch(error => setError(error));
    },
    reset() {
      statusTimer.stop();
      setCopied(false);
      setError(undefined);
    },
    copied,
    error
  } as const;
};
