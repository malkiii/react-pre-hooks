import React from 'react';
import { useSessionStorage } from '.';

/**
 * @description
 * Get and Set a specific value
 * in the [session storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).
 */

/**
 * @example
 */
export function Example() {
  const [text, setText] = useSessionStorage({ key: 'text', default: 'nothing' });

  return (
    <div className="demo">
      <label className="text-center text-balance flex flex-col max-w-md gap-4 mx-auto">
        This input will be saved in the session storage.
        <input type="text" value={text} onChange={e => setText(e.target.value)} />
      </label>
    </div>
  );
}
