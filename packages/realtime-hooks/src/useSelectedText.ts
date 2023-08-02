import { useEffect, useRef } from 'react';
import { useEventListener } from '.';

export const useSelectedText = () => {
  const selectionRef = useRef<Selection | null>(null);

  const handleSelectionChange = () => {
    selectionRef.current = document.getSelection();
  };

  const selection = selectionRef.current;
  useEffect(handleSelectionChange, []);
  useEventListener('selectionchange', handleSelectionChange, { element: document });

  return {
    text: selection?.toString() || null,
    target: selection?.focusNode?.parentElement || null,
    isSelecting: !selection?.isCollapsed
  };
};
