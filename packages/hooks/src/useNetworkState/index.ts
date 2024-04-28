import { useCallback, useRef, useState } from 'react';
import { useEventListener } from '../useEventListener';
import { useIsomorphicEffect } from '../useIsomorphicEffect';
import { getPrefixedProperty } from '../utils';

/**
 * Network Information API
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation
 */
export type NetworkInformation = {
  type?: 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown';
  rtt?: number;
  downlink?: number;
  downlinkMax?: number;
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  saveData?: boolean;
};

export const useNetworkState = () => {
  const connection = useRef<NetworkInformation>();
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [networkInfo, setNetworkInfo] = useState<NetworkInformation>({});

  const getConnectionState = useCallback((): NetworkInformation => {
    if (!connection.current) return {};
    return {
      type: connection.current?.type,
      rtt: connection.current?.rtt,
      downlink: connection.current?.downlink,
      downlinkMax: connection.current?.downlinkMax,
      effectiveType: connection.current?.effectiveType,
      saveData: connection.current?.saveData
    };
  }, []);

  const updateConnection = useCallback(async () => {
    setNetworkInfo(getConnectionState);
    try {
      const response = await fetch('https://httpbin.org/status/200');
      if (response.ok) setIsOnline(true);
    } catch (error) {
      setIsOnline(false);
    }
  }, []);

  useIsomorphicEffect(() => {
    connection.current = getPrefixedProperty(navigator, 'connection' as any);
    updateConnection();
  }, []);

  useEventListener(['change', 'typechange' as any], updateConnection, { ref: connection as any });
  useEventListener(['online', 'offline'], () => setIsOnline(navigator.onLine), {
    target: () => window
  });

  return { ...networkInfo, isOnline };
};
