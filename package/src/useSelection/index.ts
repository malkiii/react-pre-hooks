import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useEventListener } from '@/src';

export const useSelection = <T extends HTMLElement = HTMLDivElement>(ref?: RefObject<T> | null) => {
  const targetRef = ref ?? useRef<T>(null);

  const [selection, setSelection] = useState<Selection | null>(null);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);

  const getSelectionRect = useCallback(() => {
    if (!selection || selection.isCollapsed) return;
    return selection.getRangeAt(0).getBoundingClientRect();
  }, [selection]);

  const handleSelectionChange = useCallback(() => {
    const currentSelection = document.getSelection();
    const target = currentSelection?.focusNode?.parentElement;

    if (targetRef.current && !targetRef.current.contains(target!)) return;

    setSelection(currentSelection);
    setIsSelecting(!currentSelection?.isCollapsed);
  }, [targetRef]);

  const eventOptions = { target: document, passive: true };

  useEffect(handleSelectionChange, []);
  useEventListener('selectionchange', handleSelectionChange, eventOptions);
  useEventListener(['mouseup', 'touchend'], () => setIsSelecting(false), eventOptions);

  return {
    ref: targetRef,
    value: selection,
    text: selection?.toString() ?? null,
    rect: getSelectionRect(),
    isSelecting
  };
};
