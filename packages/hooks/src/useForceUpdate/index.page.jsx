import React from 'react';
import { useForceUpdate } from '.';

/**
 * @description
 * Force re-render the component.
 */

/**
 * @example
 */
export function UpdateCounter() {
  const update = useForceUpdate();
  const counter = React.useRef(0);

  return (
    <div className="demo flex items-center justify-center">
      <button
        className="primary"
        onClick={() => {
          counter.current++;
          update();
        }}
      >
        Updated {counter.current} times
      </button>
    </div>
  );
}
