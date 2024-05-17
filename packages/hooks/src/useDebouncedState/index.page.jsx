import React from 'react';
import { useDebouncedState } from '.';

/**
 * @description
 * Update a state after a specified delay.
 */

/**
 * @example
 */
export function DebouncedInput() {
  const [debounced, setValue, value] = useDebouncedState({ initial: '', delay: 400 });

  return (
    <div className="demo">
      <div className="max-w-xl mx-auto">
        <input
          type="text"
          onChange={e => setValue(e.target.value)}
          placeholder="Start writing..."
        />
        <div className="data-wrapper mt-4">
          <span>value</span>
          <p>{value}</p>
          <span>debounced</span>
          <p>{debounced}</p>
        </div>
      </div>
    </div>
  );
}
