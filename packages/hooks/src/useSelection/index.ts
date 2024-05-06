import { useCallback, useMemo, useState } from 'react';
import { useEventListener } from '../useEventListener';
import { useNewRef } from '../utils/useNewRef';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useSelection | useSelection} hook.
 */
export const useSelection = <T extends HTMLElement = HTMLDivElement>(
  ref?: React.RefObject<T> | null
) => {
  const targetRef = useNewRef<T>(ref);
  const [selection, setSelection] = useState<Selection | null>(null);

  const handleSelectionChange = useCallback(() => {
    if (!targetRef.current) return;

    const currentSelection = document.getSelection();
    const target = currentSelection?.focusNode?.parentElement;

    setSelection(targetRef.current.contains(target!) ? currentSelection : null);
  }, [targetRef]);

  const selectionData = useMemo(
    () => ({
      text: selection?.toString() ?? '',
      rect: selection?.getRangeAt(0).getBoundingClientRect(),
      isCollapsed: !!selection?.isCollapsed
    }),
    [selection]
  );

  useEventListener({
    event: 'selectionchange',
    handler: handleSelectionChange,
    target: () => {
      handleSelectionChange();
      return document;
    },
    passive: true
  });

  return { ref: targetRef, selection, ...selectionData };
};
