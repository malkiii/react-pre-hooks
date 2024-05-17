import React from 'react';
import { useClock } from '.';

/**
 * @description
 * Get the current time with an updated Date state.
 */

/**
 * @example
 */
export function Clock() {
  const clock = useClock();

  return (
    <div className="demo flex flex-col justify-center text-center">
      <div className="font-bold text-3xl" suppressHydrationWarning>
        {clock.toLocaleTimeString()}
      </div>
      <div className="text-base dark:text-gray-400 text-gray-500 mt-1" suppressHydrationWarning>
        {clock.toDateString()}
      </div>
    </div>
  );
}
