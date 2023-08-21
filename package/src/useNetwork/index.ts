import { useState } from 'react';
import { useEventListener } from '@/src';

/**
 * Network Information API
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation
 */
type NetworkInformation = {
  type: 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown';
  rtt: number;
  downlink: number;
  downlinkMax: number;
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
  saveData: boolean;
};

type NetworkState = Partial<NetworkInformation & { online: boolean }>;

const nav = navigator as any;
const connection: NetworkInformation = nav.connection || nav.mozConnection || nav.webkitConnection;

const getCurrentConnectionState = (): NetworkState => {
  return {
    online: nav?.onLine,
    type: connection?.type,
    rtt: connection?.rtt,
    downlink: connection?.downlink,
    downlinkMax: connection?.downlinkMax,
    effectiveType: connection?.effectiveType,
    saveData: connection?.saveData
  };
};

export const useNetwork = (): NetworkState => {
  const [networkState, setNetworkState] = useState<NetworkState>(getCurrentConnectionState);
  const handleChange = () => setNetworkState(getCurrentConnectionState);

  useEventListener(['online', 'offline'], handleChange, { passive: true });
  useEventListener('change', handleChange, { target: connection as any, passive: true });

  return networkState;
};
