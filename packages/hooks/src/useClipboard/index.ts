import { useMemo, useState } from 'react';
import { useTimeout } from '../useTimeout';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useClipboard | useClipboard} hook.
 */
export const useClipboard = (args: { duration?: number } = {}) => {
  const statusTimer = useTimeout({ timeout: args.duration ?? 2500 });

  const controls = useMemo(
    () => ({
      isCopied: statusTimer.isActive,
      copy: async (data?: string | ClipboardItem | ClipboardItem[] | null) => {
        if (!data) return;

        typeof data == 'string'
          ? await navigator.clipboard.writeText(data)
          : await navigator.clipboard.write(Array.isArray(data) ? data : [data]);

        statusTimer.start();
      },
      paste: async () => {
        return await navigator.clipboard.readText();
      },
      pasteData: async (type: string): Promise<ClipboardItems> => {
        const data = await navigator.clipboard.read();
        return data.filter(item => item.types.some(t => t.startsWith(type)));
      },
      reset: () => {
        statusTimer.cancel();
      }
    }),
    [statusTimer]
  );

  return controls;
};
