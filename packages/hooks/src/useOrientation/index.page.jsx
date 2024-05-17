import React from 'react';
import { useOrientation } from '.';

/**
 * @description
 * Track the device's orientation state and its changes.
 */

/**
 * @example
 */
export function DeviceOrientation() {
  const type = useOrientation();

  return (
    <div className="demo flex items-center justify-center">
      <p className="text-center text-balance">
        Your screen orientation is <span className="underline underline-offset-4">{type}</span>.
      </p>
    </div>
  );
}
