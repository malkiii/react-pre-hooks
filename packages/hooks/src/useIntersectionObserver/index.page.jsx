import React from 'react';
import { useIntersectionObserver } from '.';

/**
 * @description
 * Handle the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) API.
 */

/**
 * @example
 */
export function Example() {
  const { ref } = useIntersectionObserver({
    handler: entries => {
      const isInView = entries[0].isIntersecting;
      ref.current.classList.toggle('show', isInView);
    },
    threshold: 1 / 2
  });

  return (
    <div className="demo h-[300px] overflow-auto [&_span]:opacity-0 [&_span]:-translate-x-28 [&_.show]:opacity-100 [&_.show]:-translate-x-0">
      <div className="w-full h-[calc(100%+1.25rem)] flex items-center justify-center text-center">
        Scroll down!
      </div>
      <span
        ref={ref}
        className="max-w-md block mx-auto mt-40 mb-56 h-[180px] rounded-md reverse transition-all duration-300"
      ></span>
    </div>
  );
}

/**
 * @info
 * the `root` option is a function that returns the root element in this hook.
 */
