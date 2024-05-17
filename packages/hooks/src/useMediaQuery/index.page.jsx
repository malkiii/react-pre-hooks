import React from 'react';
import { useMediaQuery } from '.';

/**
 * @description
 * Track the user media query changes using a boolean state.
 */

/**
 * @example
 */
export function Example() {
  const isDark = useMediaQuery('(prefers-color-scheme: dark)');

  const colorScheme = isDark ? 'Dark' : 'Light';

  return (
    <div className="demo flex items-center justify-center">
      <p className="text-center text-balance">
        System color scheme is <span className="underline underline-offset-4">{colorScheme}</span>.
      </p>
    </div>
  );
}
