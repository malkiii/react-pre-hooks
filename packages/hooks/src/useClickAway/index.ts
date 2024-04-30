import { useCallback } from 'react';
import { useEventListener } from '../useEventListener';
import { useNewRef } from '../utils/useNewRef';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useClickAway | useClickAway} hook.
 */
export const useClickAway = <T extends HTMLElement = HTMLDivElement>(args: {
  handler: (event: MouseEvent) => any;
  ref?: React.RefObject<T> | null;
}) => {
  const targetRef = useNewRef<T>(args.ref);

  const handleClick = useCallback(
    (event: MouseEvent) => {
      const element = targetRef.current;
      element && !element.contains(event.target as Node) && args.handler(event);
    },
    [args.handler]
  );

  useEventListener({
    event: 'click',
    handler: handleClick,
    target: () => document
  });

  return targetRef;
};
