import React from 'react';
import { useDragAndDrop } from '.';

/**
 * @description
 * Handle the user **drag** actions on a container element.
 */

/**
 * @example
 */
export function Example() {
  const ref = useDragAndDrop({
    handler: action => {
      const target = action.target;

      const rect = ref.current.getBoundingClientRect();

      target.style.left = action.clientX - rect.left + 'px';
      target.style.top = action.clientY - rect.top + 'px';
    }
  });

  return (
    <div ref={ref} style={{ touchAction: 'none' }} className="demo relative h-[360px]">
      <div className="absolute aspect-square w-24 rounded-md bg-slate-950 dark:bg-slate-50 dark:text-neutral-950 text-slate-50 flex items-center justify-center font-bold select-none cursor-grab active:cursor-grabbing top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ease-out">
        Drag
      </div>
    </div>
  );
}
