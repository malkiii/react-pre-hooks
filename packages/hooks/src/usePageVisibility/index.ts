import { useCallback, useState } from 'react';
import { useEventListener } from '../useEventListener';
import { getPrefixedProperty } from '../utils';

export const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleVisibilityChange = useCallback((force?: boolean) => {
    if (force !== undefined) return setIsVisible(force);
    setIsVisible(!getPrefixedProperty(document, 'hidden'));
  }, []);

  useEventListener({
    event: 'blur',
    handler: () => handleVisibilityChange(false),
    target: () => window
  });

  useEventListener({
    event: 'focus',
    handler: () => handleVisibilityChange(true),
    target: () => window
  });

  useEventListener({
    event: 'visibilitychange',
    handler: () => handleVisibilityChange(),
    target: () => document
  });

  return isVisible;
};
