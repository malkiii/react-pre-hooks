import { useCallback, useState } from 'react';
import { useEventListener, useIsomorphicEffect } from '..';
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

const connection = getPrefixedProperty(navigator, 'connection' as any);
const getCurrentConnectionState = (): NetworkInformation => {
  return {
    type: connection?.type,
    rtt: connection?.rtt,
    downlink: connection?.downlink,
    downlinkMax: connection?.downlinkMax,
    effectiveType: connection?.effectiveType,
    saveData: connection?.saveData
  };
};

export const useNetworkState = () => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [networkInfo, setNetworkInfo] = useState<NetworkInformation>(getCurrentConnectionState);

  const updateConnection = useCallback(async () => {
    setNetworkInfo(getCurrentConnectionState);
    try {
      const response = await fetch('https://httpbin.org/status/200');
      if (response.ok) setIsOnline(true);
    } catch (error) {
      setIsOnline(false);
    }
  }, []);

  useIsomorphicEffect(() => {
    updateConnection();
  }, []);

  useEventListener(['change', 'typechange' as any], updateConnection, { target: connection });
  useEventListener(['online', 'offline'], () => setIsOnline(navigator.onLine), { target: window });

  return { ...networkInfo, isOnline };
};
