import React from 'react';
import { useTimeout } from '.';

/**
 * @description
 * Use a [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout)
 * state with some methods to control it.
 */

/**
 * @example
 */
export function Example() {
  const timeout = useTimeout({
    callback: () => alert('Hello!'),
    timeout: 2000
  });

  return (
    <div className="demo flex items-center justify-center">
      {timeout.isActive ? (
        <button className="border" onClick={timeout.cancel}>
          Cancel the message
        </button>
      ) : (
        <button className="primary" onClick={timeout.start}>
          Send a message after 2 seconds
        </button>
      )}
    </div>
  );
}
