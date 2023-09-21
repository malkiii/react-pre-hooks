import { useState } from 'react';
import { useEventListener } from '@/src';

export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean>(() => navigator.onLine);
  const handleChange = () => setIsOnline(navigator.onLine);

  useEventListener(['online', 'offline'], handleChange, { passive: true });

  return isOnline;
};
