import { useCallback, useState } from 'react';
import { useEventListener } from '../useEventListener';
import { useNewRef } from '../utils/useNewRef';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useSelection | useSelection} hook.
 */
export const useSelection = <T extends HTMLElement = HTMLDivElement>(
  ref?: React.RefObject<T> | null
) => {
  const targetRef = useNewRef<T>(ref);
  const [selection, setSelection] = useState({
    text: '',
    rect: undefined as DOMRect | undefined
  });

  const [isSelecting, setIsSelecting] = useState(false);

  const handleSelectionChange = useCallback(() => {
    const currentSelection = document.getSelection();
    const target = currentSelection?.focusNode?.parentElement;

    const text = currentSelection?.toString();
    const isTarget = !!targetRef.current?.contains(target!);

    if (!text || (targetRef.current && !isTarget)) {
      setIsSelecting(false);
      setSelection({ text: '', rect: undefined });
      return;
    }

    const selectionRect = currentSelection?.getRangeAt(0).getBoundingClientRect();

    setIsSelecting(!currentSelection?.isCollapsed);

    setSelection({
      text,
      rect:
        selectionRect &&
        new DOMRect(
          selectionRect.left + window.scrollX,
          selectionRect.top + window.scrollY,
          selectionRect.width,
          selectionRect.height
        )
    });
  }, [targetRef]);

  useEventListener({
    event: 'selectionchange',
    handler: handleSelectionChange,
    target: () => {
      handleSelectionChange();
      return document;
    },
    passive: true
  });

  useEventListener({
    event: 'pointerup',
    handler: () => setIsSelecting(false),
    target: () => document
  });

  return { ...selection, isSelecting, ref: targetRef };
};
