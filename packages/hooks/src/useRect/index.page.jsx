import React from 'react';
import { useRect } from '.';

/**
 * @descriptio
 * Track the bounding [DOMRect](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect) of a target element.
 */

/**
 * @example
 */
export function Example() {
  const { ref, rect } = useRect();

  return (
    <div className="demo h-[320px] flex items-center justify-center *:[scrollbar-width:none]">
      <div
        ref={ref}
        className="wrapper flex items-center justify-center p-5 resize overflow-auto mx-auto max-w-xl max-h-full min-h-10 min-w-fit"
      >
        {rect && `${Math.round(rect.width)} x ${Math.round(rect.height)}`}
      </div>
    </div>
  );
}
