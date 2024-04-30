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

  useEventListener({
    event: 'selectionchange',
    handler: handleSelectionChange,
    target: () => {
      handleSelectionChange();
      return document;
    },
    passive: true
  });

  return { ref: targetRef, text, rect, isCollapsed };
};
