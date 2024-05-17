import React from 'react';
import { useNetworkState } from '.';

/**
 * @description
 * Handle the [NetworkInformation](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation) API
 * and the user network connection changes.
 */

/**
 * @example
 */
export function NetworkData() {
  const { isOnline, ...info } = useNetworkState();

  return (
    <div className="demo">
      <div className="data-wrapper">
        <span>Status</span>
        <p className="flex items-center justify-start gap-2">
          <i
            className="block rounded-full aspect-square h-3"
            style={{
              background: isOnline ? '#00e137' : '#ff2525'
            }}
          ></i>
          {isOnline ? 'Online' : 'Offline'}
        </p>
        {Object.entries(info).map(([name, value]) => (
          <React.Fragment key={name}>
            <span>{name}</span>
            <p>{value ?? 'Unknown'}</p>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/**
 * @warning
 * Some network informations may not supported in other browsers.
 * checkout [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation#browser_compatibility)
 */
