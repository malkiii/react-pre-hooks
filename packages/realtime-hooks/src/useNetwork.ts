import { useRef, useState } from 'react';
import { useEventListener } from './useEventListener';
import { useWindowEvents } from './useWindowEvents';

/**
 * Network Information API
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation
 */
type NetworkInformation = {
  downlink: number;
  downlinkMax: number;
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
  rtt: number;
  saveData: boolean;
  type: 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown';
  onChange: (event: Event) => void;
};

type NetworkState = Partial<NetworkInformation> & {
  online: boolean | undefined;
};

const nav = navigator as any;
const connection: NetworkInformation =
  nav && (nav.connection || nav.mozConnection || nav.webkitConnection);

function getConnectionState(): NetworkState {
  return {
    online: nav?.onLine,
    downlink: connection?.downlink,
    downlinkMax: connection?.downlinkMax,
    effectiveType: connection?.effectiveType,
    rtt: connection?.rtt,
    saveData: connection?.saveData,
    type: connection?.type
  };
}

export const useNetworkState = (): NetworkState => {
  const connectionRef = useRef<any>(connection);
  const [state, setState] = useState<NetworkState>(getConnectionState);
  const handleChange = () => setState(getConnectionState);

  useWindowEvents(['online', 'offline'], handleChange, { passive: true });
  useEventListener('change', handleChange, { ref: connectionRef, passive: true });

  return state;
};
