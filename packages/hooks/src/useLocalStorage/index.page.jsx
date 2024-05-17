import React from 'react';
import { useLocalStorage } from '.';

/**
 * @description
 * Get and Set a specific value in the [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
 */

/**
 * @example
 */
export function Example() {
  const [text, setText] = useLocalStorage({ key: 'text', default: 'nothing' });

  return (
    <div className="demo">
      <label className="text-center flex flex-col max-w-md gap-4 mx-auto">
        This input will be saved in the local storage.
        <input type="text" defaultValue={text} onChange={e => setText(e.target.value)} />
      </label>
    </div>
  );
}
