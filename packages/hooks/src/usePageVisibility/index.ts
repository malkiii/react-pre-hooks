import { useCallback, useState } from 'react';
import { useEventListener } from '../useEventListener';
import { getPrefixedProperty } from '../utils';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/usePageVisibility | usePageVisibility} hook.
 */
export const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleVisibilityChange = useCallback((force?: boolean) => {
    if (force !== undefined) return setIsVisible(force);
    setIsVisible(!getPrefixedProperty(document, 'hidden'));
  }, []);

  useEventListener({
    event: ['focus', 'blur'],
    handler: e => handleVisibilityChange(e.type === 'focus'),
    target: () => window
  });

  useEventListener({
    event: 'visibilitychange',
    handler: () => handleVisibilityChange(),
    target: () => document
  });

  return isVisible;
};
