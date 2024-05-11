import { useState } from 'react';
import { useEventListener } from '../useEventListener';
import { useNewRef } from '../utils/useNewRef';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useFocus | useFocus} hook.
 */
export const useFocus = <T extends HTMLElement = HTMLDivElement>(
  ref?: React.RefObject<T> | null
) => {
  const targetRef = useNewRef<T>(ref);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEventListener({
    event: ['focus', 'blur'],
    handler: e => setIsFocused(e.type === 'focus'),
    ref: targetRef
  });

  return { ref: targetRef, isFocused };
};
