import { useEffect, useState } from 'react';
import { useWindowEvents } from './useWindowEvents';

export const useSelectedText = () => {
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);

  const handleSelectionChange = () => {
    setSelectedText(document.getSelection()?.toString() || null);
  };

  useWindowEvents('mouseup', () => setIsSelecting(false));
  useWindowEvents('mousedown', () => setIsSelecting(!!selectedText));

  useEffect(() => {
    handleSelectionChange();
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  return { text: selectedText, isSelecting };
};
