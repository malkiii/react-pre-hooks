import React from 'react';
import { useSwiping } from '.';

/**
 * @description
 * Handle the user **swipe** actions on a container element.
 */

/**
 * @example
 */
export function Slider() {
  const startRef = React.useRef(0);

  const ref = useSwiping({
    handler: action => {
      if (action.type === 'start') {
        startRef.current = ref.current.scrollLeft;
      }

      ref.current.scrollTo({ left: startRef.current + action.deltaX });
    }
  });

  return (
    <div className="demo select-none touch-none">
      <div
        ref={ref}
        className="overflow-auto cursor-grab active:cursor-grabbing border rounded-md w-full p-2 min-w-0 max-w-lg mx-auto flex items-center justify-start gap-2 [scrollbar-width:none]"
      >
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="flex items-center transition-all justify-center min-w-[210px] aspect-square border rounded-md"
          >
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  );
}
