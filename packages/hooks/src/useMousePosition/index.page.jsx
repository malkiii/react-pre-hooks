import React from 'react';
import { useMousePosition } from '.';

/**
 * @description
 * Track the user's mouse cursor position on the window or a target element.
 */

/**
 * @example
 */
export function MouseTrailer() {
  const { ref, x: left, y: top, isInside } = useMousePosition();

  return (
    <div
      ref={ref}
      className="demo h-[320px] relative flex items-center select-none justify-center overflow-hidden"
    >
      <p className="text-center text-balance">Start moving your mouse cursor.</p>
      <span
        style={{ top, left, height: isInside ? '5rem' : '0' }}
        className="absolute block -translate-x-1/2 -translate-y-1/2 transition-all ease-out aspect-square rounded-full backdrop-invert"
      ></span>
    </div>
  );
}
