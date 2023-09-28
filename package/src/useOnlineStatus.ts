import { useCallback, useLayoutEffect, useState } from 'react';
import { useEventListener } from '@/src';
import { getPrefixedProperty } from '@/src/utils';

export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const connection = getPrefixedProperty(navigator, 'connection' as any);

  const testConnection = useCallback(async () => {
    try {
      const response = await fetch('https://httpbin.org/status/200');
      if (response.ok) setIsOnline(true);
    } catch (error) {
      setIsOnline(false);
    }
  }, []);

  useLayoutEffect(() => {
    testConnection();
  }, []);

  useEventListener(['online', 'offline'], () => setIsOnline(navigator.onLine), { target: window });
  useEventListener(['change', 'typechange' as any], testConnection, { target: connection });

  return isOnline;
};
