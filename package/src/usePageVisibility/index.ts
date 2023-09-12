import { useCallback, useState } from 'react';
import { useEventListener } from '@/src';

const documentHiddenProperties = ['hidden', 'mozHidden', 'webkitHidden', 'oHidden', 'msHidden'];

export const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleVisibilityChange = useCallback((force?: boolean) => {
    if (force !== undefined) return setIsVisible(force);
    setIsVisible(documentHiddenProperties.some(prop => (document as any)[prop]));
  }, []);

  useEventListener('blur', () => handleVisibilityChange(false));
  useEventListener('focus', () => handleVisibilityChange(true));
  useEventListener('visibilitychange' as any, () => handleVisibilityChange(), { target: document });

  return isVisible;
};
