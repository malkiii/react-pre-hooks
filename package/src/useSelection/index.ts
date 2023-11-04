import { RefObject, useCallback, useEffect, useState } from 'react';
import { useEventListener } from '..';
import { useNewRef } from '../utils/useNewRef';

export const useSelection = <T extends HTMLElement = HTMLDivElement>(ref?: RefObject<T> | null) => {
  const targetRef = useNewRef<T>(ref);

  const [text, setText] = useState<string>('');
  const [rect, setRect] = useState<DOMRect>();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const handleSelectionChange = useCallback(() => {
    const currentSelection = document.getSelection();
    const target = currentSelection?.focusNode?.parentElement;
    const isCollapsed = !!currentSelection?.isCollapsed;

    if (targetRef.current && !targetRef.current.contains(target!)) return;

    setIsCollapsed(isCollapsed);
    setText(currentSelection?.toString() ?? '');
    if (!isCollapsed) setRect(currentSelection?.getRangeAt(0).getBoundingClientRect());
  }, [targetRef]);

  useEffect(handleSelectionChange, []);
  useEventListener('selectionchange', handleSelectionChange, { target: document, passive: true });

  return { ref: targetRef, text, rect, isCollapsed };
};
