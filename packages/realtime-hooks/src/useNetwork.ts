import { useState } from 'react';
import { useEventListener, useWindowEvents } from '.';

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
  onChange: (event: Event) => void;
};

type NetworkState = Partial<NetworkInformation> & {
  online: boolean | undefined;
};

const nav = navigator as any;
const connection: NetworkInformation =
  nav && (nav.connection || nav.mozConnection || nav.webkitConnection);

const getConnectionState = (): NetworkState => {
  return {
    online: nav?.onLine,
    downlink: connection?.downlink,
    downlinkMax: connection?.downlinkMax,
    effectiveType: connection?.effectiveType,
    rtt: connection?.rtt,
    saveData: connection?.saveData,
    type: connection?.type
  };
};

export const useNetwork = (): NetworkState => {
  const [state, setState] = useState<NetworkState>(getConnectionState);
  const handleChange = () => setState(getConnectionState);

  useWindowEvents(['online', 'offline'], handleChange, { passive: true });
  useEventListener('change', handleChange, { element: connection as any, passive: true });

  return state;
};
