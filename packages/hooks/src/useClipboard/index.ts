import { useMemo, useState } from 'react';
import { useTimeout } from '../useTimeout';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useClipboard | useClipboard} hook.
 */
export const useClipboard = (args: { duration?: number } = {}) => {
  const statusTimer = useTimeout({ timeout: args.duration ?? 2500 });
  const [error, setError] = useState<unknown>();

  const controls = useMemo(
    () => ({
      isCopied: statusTimer.isActive,
      copy: async (data?: string | ClipboardItem | ClipboardItem[] | null) => {
        if (!data) return;

        const copyItems =
          typeof data == 'string'
            ? navigator.clipboard.writeText(data)
            : navigator.clipboard.write(Array.isArray(data) ? data : [data]);

        copyItems.then(statusTimer.start).catch(setError);
      },
      paste: async () => {
        try {
          return await navigator.clipboard.readText();
        } catch (error) {
          setError(error);
          return '';
        }
      },
      pasteData: async (type: string): Promise<ClipboardItems> => {
        try {
          const data = await navigator.clipboard.read();
          return data.filter(item => item.types.some(t => t.startsWith(type)));
        } catch (error) {
          setError(error);
          return [];
        }
      },
      reset: () => {
        statusTimer.cancel();
      }
    }),
    [statusTimer]
  );

  return { error, ...controls };
};
