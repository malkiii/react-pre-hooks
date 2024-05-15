import React from 'react';
import { useAsyncCallback } from '.';

/**
 * @description
 * Handle the execution of an async function with return data, error, and pending states.
 */

/**
 * @example
 */
export function Example() {
  const getData = ms => {
    return new Promise(res => setTimeout(() => res(`Resolved after ${ms}ms`), ms));
  };

  const { data, isPending, callback } = useAsyncCallback(async () => {
    return await getData(2200);
  });

  return (
    <div className="demo flex items-center justify-center">
      <div className="wrapper flex items-center justify-between w-full max-w-md">
        <p>{isPending ? 'Loading...' : data ?? 'No data.'}</p>
        <button className="primary" onClick={callback}>
          Get
        </button>
      </div>
    </div>
  );
}
