import React from 'react';
import { useGridLayout } from '.';

/**
 * @description
 * Track the number of rows and columns of an element with a **grid** layout.
 */

/**
 * @example
 */
export function GridLayout() {
  const { ref, rows, columns } = useGridLayout();

  return (
    <div className="demo h-[460px] pl-[1rem!important] pr-[0!important]">
      <div className="max-w-xl mx-auto px-8">
        <div className="relative select-none">
          <span className="divider vertical mb-2 border-x h-6">{columns}</span>
          <span className="divider horizontal absolute w-6 max-h-[calc(460px-5rem)] right-full -translate-x-2 top-8 border-y">
            {rows}
          </span>
          <div
            ref={ref}
            className="gap-2 *:rounded-md *:border *:aspect-square"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))'
            }}
          >
            {[...Array(12)].map((_, index) => (
              <span key={index} className="flex items-center justify-center"></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
