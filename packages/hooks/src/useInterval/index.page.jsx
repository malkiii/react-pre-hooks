import React from 'react';
import { useInterval } from '.';
import { useCounter } from '../useCounter';

/**
 * @description
 * Use a [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)
 * state with some methods to control it.
 */

/**
 * @example
 */
export function Counter() {
  const counter = useCounter();

  const interval = useInterval({
    callback: () => counter.inc(),
    startOnMount: true,
    timeout: 1000
  });

  return (
    <div className="demo flex items-center justify-center">
      <div className="wrapper flex items-center justify-between w-full max-w-[240px]">
        <p>{counter.value}</p>
        <button className="primary" onClick={() => interval.toggle()}>
          {interval.isActive ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
}
