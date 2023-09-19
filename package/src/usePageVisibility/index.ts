import { useCallback, useState } from 'react';
import { useEventListener } from '@/src';
import { getPrefixedProperty } from '@/src/utils';

export const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleVisibilityChange = useCallback((force?: boolean) => {
    if (force !== undefined) return setIsVisible(force);
    setIsVisible(!!getPrefixedProperty(document, 'hidden'));
  }, []);

  useEventListener('blur', () => handleVisibilityChange(false));
  useEventListener('focus', () => handleVisibilityChange(true));
  useEventListener('visibilitychange' as any, () => handleVisibilityChange(), { target: document });

  return isVisible;
};
