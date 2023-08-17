import { useEffect, useState } from 'react';
import { useEventListener } from '@/src';

export const useSelection = () => {
  const [selection, setSelection] = useState<Selection | null>(null);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);

  const getSelectionRect = () => {
    if (!selection || selection.isCollapsed) return;

    return selection.getRangeAt(0).getBoundingClientRect();
  };

  const handleSelectionChange = () => {
    const currentSelection = document.getSelection();

    setSelection(currentSelection);
    setIsSelecting(!currentSelection?.isCollapsed);
  };

  useEffect(handleSelectionChange, []);
  useEventListener('selectionchange', handleSelectionChange, { target: document });
  useEventListener(['mouseup', 'touchend'], () => setIsSelecting(false), { target: document });

  return {
    text: selection?.toString() || null,
    target: selection?.focusNode?.parentElement || null,
    rect: getSelectionRect(),
    isSelecting
  };
};
