import { useCallback, useState } from 'react';
import { useEventListener } from '..';
import { getPrefixedProperty } from '../utils';

export const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleVisibilityChange = useCallback((force?: boolean) => {
    if (force !== undefined) return setIsVisible(force);
    setIsVisible(!getPrefixedProperty(document, 'hidden'));
  }, []);

  useEventListener('blur', () => handleVisibilityChange(false), { ref: window });
  useEventListener('focus', () => handleVisibilityChange(true), { ref: window });
  useEventListener('visibilitychange', () => handleVisibilityChange(), { ref: document });

  return isVisible;
};
