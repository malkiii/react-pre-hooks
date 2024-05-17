import React from 'react';
import { useCounter } from '.';

/**
 * @description
 * Use simple counter methods to update a number state.
 */

/**
 * @example
 */
export function Counter() {
  const counter = useCounter({ min: -20, max: 20 });

  return (
    <div className="demo flex items-center justify-center">
      <div className="wrapper flex items-center gap-4">
        <button className="border" onClick={() => counter.dec()}>
          <span className="text-2xl w-4">-</span>
        </button>
        <span className="block w-8 text-center">{counter.value}</span>
        <button className="border" onClick={() => counter.inc()}>
          <span className="text-2xl w-4">+</span>
        </button>
      </div>
    </div>
  );
}
