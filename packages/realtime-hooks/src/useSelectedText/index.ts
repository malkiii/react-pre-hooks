import { useEffect, useRef, useState } from 'react';
import { useEventListener } from '@/src';

export const useSelectedText = () => {
  const selectionRef = useRef<Selection | null>(null);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);

  const handleSelectionChange = () => {
    selectionRef.current = document.getSelection();
    setIsSelecting(!!selectionRef.current?.isCollapsed);
  };

  const selection = selectionRef.current;
  useEffect(handleSelectionChange, []);
  useEventListener('selectionchange', handleSelectionChange, { element: document });
  useEventListener('mouseup', () => setIsSelecting(false), { element: document });

  return {
    text: selection?.toString() || null,
    target: selection?.focusNode?.parentElement || null,
    isSelecting
  };
};
