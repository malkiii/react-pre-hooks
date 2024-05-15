import React from 'react';
import { useBoolean } from '.';

/**
 * @description
 * Toggle between `true` and `false` using a boolean state.
 */

/**
 * @example
 */
export function Example() {
  const [isOpen, toggle] = useBoolean();

  return (
    <div className="demo flex items-center justify-center">
      <div role="button" onClick={() => toggle()} className="select-none flex items-center gap-4">
        <span>Toggle</span>
        <div className="bg-current inline-block relative h-[1.5rem] aspect-[2/1] rounded-full border-2 border-current">
          <span
            className="block relative aspect-square h-full rounded-[50%] dark:bg-[#111] bg-slate-50 transition-all duration-200"
            style={{
              left: isOpen ? '100%' : '0',
              translate: isOpen ? '-100%' : '0'
            }}
          ></span>
        </div>
      </div>
    </div>
  );
}
