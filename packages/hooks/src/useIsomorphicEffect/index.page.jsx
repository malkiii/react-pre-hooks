import React from 'react';
import { useIsomorphicEffect } from '.';

/**
 * @description
 * A replacement for [useLayoutEffect](https://react.dev/reference/react/useLayoutEffect) that works on the browser and the server.
 */

/**
 * @example
 */
export function Example() {
  useIsomorphicEffect(() => {
    console.log('HI!');
  }, []);

  return (
    <div className="demo flex items-center justify-center">
      <p className="text-center text-balance">Check the console.</p>
    </div>
  );
}
