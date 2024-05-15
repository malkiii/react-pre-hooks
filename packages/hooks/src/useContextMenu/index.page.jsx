import React from 'react';
import { useContextMenu } from '.';

/**
 * @description
 * Handle the user right clicks on a target element to show a context menu.
 */

/**
 * @example
 */
export function Example() {
  const { ref, canShow, clientX, clientY } = useContextMenu();

  return (
    <div ref={ref} className="demo flex items-center justify-center">
      <p className="font-bold text-base my-0">Right click anywhere.</p>
      {canShow && (
        <div
          role="list"
          onMouseDownCapture={e => e.button == 1 && e.stopPropagation()}
          style={{
            position: 'fixed',
            top: clientY,
            left: clientX
          }}
          className="p-2 animate-in fade-in border dark:bg-[#111] bg-slate-50 rounded-md duration-200 space-y-2 shadow-xl w-40 *:border"
        >
          <a href="#">Item 1</a>
          <a href="#">Item 2</a>
          <a href="#">Item 3</a>
        </div>
      )}
    </div>
  );
}
