import React from 'react';
import { useSelection } from '.';

/**
 * @description
 * Get the current selected text with its position on the window or a target element.
 */

/**
 * @example
 */
export function Example() {
  const { ref, text, rect } = useSelection();

  return (
    <div ref={ref} className="demo">
      {text && (
        <button
          className="primary shadow-xl rounded-md bg-primary [animation-duration:170ms] animate-in fade-in text-slate-50 px-2 py-1 before:absolute before:aspect-square before:w-5 before:bg-inherit before:top-full before:left-1/2 before:-translate-x-1/2 before:-translate-y-1 before:[clip-path:polygon(50%_50%,0_0,100%_0)]"
          onClick={() => alert(`"${text}"`)}
          style={{
            position: 'absolute',
            top: rect.top + 'px',
            left: rect.left + rect.width / 2,
            translate: '-50% -125%'
          }}
        >
          Quote this!
        </button>
      )}
      <article>
        <span className="block text-2xl font-bold">Select anything.</span>
        <p>
          A user may make a selection from left to right (in document order) or right to left
          (reverse of document order). The anchor is where the user began the selection and the
          focus is where the user ends the selection. If you make a selection with a desktop mouse,
          the anchor is placed where you pressed the mouse button, and the focus is placed where you
          released the mouse button.
        </p>
      </article>
    </div>
  );
}
