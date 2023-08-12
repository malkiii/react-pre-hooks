import { useEffect, useRef, useState } from 'react';
import { useEventListener } from '@/src';

export const useSelection = () => {
  const selectionRef = useRef<Selection | null>(null);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);

  const getSelectionRect = () => {
    const selection = selectionRef.current;
    if (!selection || selection.isCollapsed) return;

    return selection.getRangeAt(0).getBoundingClientRect();
  };

  const handleSelectionChange = () => {
    selectionRef.current = document.getSelection();
    setIsSelecting(!selectionRef.current?.isCollapsed);
  };

  useEffect(handleSelectionChange, []);
  useEventListener('mouseup', () => setIsSelecting(false), { element: document });
  useEventListener('selectionchange', handleSelectionChange, { element: document });

  return {
    text: selectionRef.current?.toString() || null,
    target: selectionRef.current?.focusNode?.parentElement || null,
    rect: getSelectionRect(),
    isSelecting
  };
};
