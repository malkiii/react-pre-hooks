import React from 'react';
import { useFullscreen } from '.';

/**
 * @description
 * Toggle the fullscreen mode on a target element.
 */

/**
 * @example
 */
export function Example() {
  const fullscreen = useFullscreen();

  return (
    <div className="demo flex items-center justify-center">
      <button
        ref={fullscreen.ref}
        className="primary w-2/3 h-[240px] items-center justify-center"
        onClick={() => fullscreen.toggle()}
      >
        {fullscreen.isEnabled ? 'Exit' : 'Enter'} fullscreen!
      </button>
    </div>
  );
}
