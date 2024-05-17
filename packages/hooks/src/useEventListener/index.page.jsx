import React from 'react';
import { useEventListener } from '.';

/**
 * @description
 * Add an event listener with one or multiple events to an HTML element, `window`, or `document` object.
 */

/**
 * @example
 */
export function Box() {
  const [isInside, setIsInside] = React.useState(false);

  useEventListener({
    event: ['mouseenter', 'mouseleave'],
    handler: e => setIsInside(e.type === 'mouseenter'),
    target: () => document.getElementById('box')
  });

  return (
    <div id="box" className="demo cursor-help flex items-center justify-center">
      <p className="my-0 font-bold text-xl *:underline-offset-4">
        Your cursor is <span className="underline">{isInside ? 'inside' : 'outside'}</span> the box.
      </p>
    </div>
  );
}

/**
 * @warning
 * You must always specify the `target` or the `ref` property otherwise it will not work.
 */
