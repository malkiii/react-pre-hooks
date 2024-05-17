import React from 'react';
import { useScrollPosition } from '.';

/**
 * @description
 * Track the scroll **position** or **progress** of the window or a target element.
 */

/**
 * @example
 */
export function Progressbar() {
  const { ref, progressY } = useScrollPosition();

  return (
    <div ref={ref} className="demo relative h-[240px] overflow-auto p-[0!important]">
      <div
        style={{ width: progressY * 100 + '%' }}
        className="sticky top-0 transition-all ease-out duration-300 bg-primary h-2"
      ></div>
      <div className="h-[640px] text-center pt-24">Scroll to see the progress.</div>
    </div>
  );
}
