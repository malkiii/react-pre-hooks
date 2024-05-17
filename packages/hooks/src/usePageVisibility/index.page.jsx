import React from 'react';
import { usePageVisibility } from '.';
import { useCounter } from '../useCounter';

/**
 * @description
 * Check if the current tab is visible or hidden to the user.
 */

/**
 * @example
 */
export function Example() {
  const counter = useCounter();
  const isVisible = usePageVisibility();

  React.useEffect(() => {
    if (!isVisible) counter.inc();
  }, [isVisible]);

  return (
    <div className="demo flex items-center justify-center">
      <p className="text-center text-balance">You left the page {counter.value} times.</p>
    </div>
  );
}
