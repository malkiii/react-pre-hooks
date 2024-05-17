import React from 'react';
import { useScrollDirection } from '.';

/**
 * @description
 * Detect the user scroll direction on the window or a target element.
 */

/**
 * @example
 */
export function Navbar() {
  const { ref, isDown, isUp } = useScrollDirection();

  return (
    <div ref={ref} className="demo relative h-[240px] overflow-auto p-[0!important]">
      <div
        style={{
          translate: isUp || !isDown ? '0 0' : '0 -100%'
        }}
        className="sticky top-0 inset-x-0 transition-all duration-300 bg-primary p-4"
      >
        <p className="mx-auto w-fit text-slate-50">This will apears scroll up.</p>
      </div>
      <div className="h-[640px]"></div>
    </div>
  );
}
