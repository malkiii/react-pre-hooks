import React from 'react';
import { useToggle } from '.';

/**
 * @description
 * Toggle a state between a given array of values.
 */

/**
 * @example
 */
export function Colors() {
  const [value, toggle] = useToggle({ values: [0, 90, 180, 270], startIndex: 0 });

  return (
    <div className="demo select-none">
      <div className="relative py-7 max-w-[240px] mx-auto cursor-pointer after:absolute after:border-[12px] after:border-transparent after:border-t-current after:top-1 after:left-1/2 after:-translate-x-1/2">
        <div
          onClick={() => toggle()}
          style={{
            rotate: value + 'deg',
            border: '25px solid',
            borderColor: 'currentColor #ff2525 #00e137 #00aaff'
          }}
          className="aspect-square transition-all duration-200 rounded-full w-full"
        ></div>
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
          Toggle
        </span>
      </div>
    </div>
  );
}
