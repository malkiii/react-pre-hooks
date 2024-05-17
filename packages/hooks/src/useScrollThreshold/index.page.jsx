import React from 'react';
import { useScrollThreshold } from '.';

/**
 * @description
 * Check if the user has scrolled past a certain threshold using a given offset or handler.
 */

/**
 * @example
 */
export function Navbar() {
  const { ref, isPast } = useScrollThreshold({ threshold: { top: 160 } });

  return (
    <div ref={ref} className="demo relative h-[240px] overflow-auto p-[0!important]">
      <div
        style={{
          translate: isPast ? '0 -100%' : '0 0'
        }}
        className="sticky top-0 inset-x-0 transition-all duration-300 bg-primary p-4"
      >
        <p className="mx-auto w-fit text-slate-50">
          This will disapears when you scroll past 160px.
        </p>
      </div>
      <div className="h-[640px]"></div>
    </div>
  );
}
