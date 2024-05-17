import React from 'react';
import { useMutationObserver } from '.';

/**
 * @description
 * Handle the [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
 * to track changes being made to the DOM tree.
 */

/**
 * @example
 */
export function Example() {
  const { ref } = useMutationObserver({
    handler: mutations => {
      alert(`New child added. Total children: ${mutations[0].target.children.length}`);
    },
    childList: true
  });

  return (
    <div className="demo max-h-[320px] overflow-auto">
      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <button
          className="primary justify-center"
          onClick={() => (ref.current.innerHTML += `<p>New child</p>`)}
        >
          Add new child
        </button>
        <div
          ref={ref}
          className="wrapper flex items-start justify-start flex-wrap *:rounded-md *:px-2 *:py-1 gap-2 *:border min-h-20"
        ></div>
      </div>
    </div>
  );
}
