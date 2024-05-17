import React from 'react';
import { useViewport } from '.';

/**
 * @description
 * Track the current screen viewport (width and height).
 */

/**
 * @example
 */
export function Example() {
  const { width, height } = useViewport();

  return (
    <div className="demo flex items-center justify-center">
      <p className="center">
        {width} x {height}
      </p>
    </div>
  );
}
