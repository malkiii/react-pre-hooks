import React from 'react';
import { useInView } from '.';

/**
 * @description
 * Track the visibility of a target element using [useIntersectionObserver](./useIntersectionObserver) hook.
 */

/**
 * @example
 */
export function Container() {
  const { ref, isInView } = useInView({ once: true, threshold: 1 / 2 });

  return (
    <div className="demo h-[300px] overflow-auto">
      <div className="w-full h-[calc(100%+1.25rem)] flex items-center justify-center text-center">
        Scroll down!
      </div>
      <span
        ref={ref}
        style={!isInView ? { opacity: 0, translate: '-7rem' } : {}}
        className="max-w-md block mx-auto mt-40 mb-56 h-[180px] rounded-md reverse transition-all duration-300"
      ></span>
    </div>
  );
}
