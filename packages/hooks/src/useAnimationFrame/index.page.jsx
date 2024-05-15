import React from 'react';
import { useAnimationFrame } from '.';
import { useCounter } from '../useCounter';

/**
 * @description
 * Handle the [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
 * API to call a function on every frame render.
 */

/**
 * @example
 */
export function Example() {
  const position = useCounter();

  const animation = useAnimationFrame({
    callback: () => position.set(p => (p > 100 ? 0 : p + 1))
  });

  return (
    <div className="demo">
      <div className="flex justify-center *:w-24 *:justify-center gap-4">
        <button className="primary" onClick={animation.start}>
          Start
        </button>
        <button className="primary" onClick={animation.cancel}>
          Cancel
        </button>
      </div>
      <div className="wrapper h-20 mt-4 px-[0!important]">
        <div
          className="relative bg-primary -translate-x-full aspect-square rounded-md h-full"
          style={{
            left: `${position.value}%`,
            translate: `${position.value * 2 - 100}% 0`
          }}
        ></div>
      </div>
    </div>
  );
}
