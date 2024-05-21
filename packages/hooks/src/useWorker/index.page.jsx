import React from 'react';
import { useWorker } from '.';

/**
 * @description
 * Use the [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker) API to run a script in the background.
 */

/**
 * @example
 */
export function Example() {
  const worker = useWorker({
    script: calculateSum,
    handler: (message, error) => {
      if (error) alert(`ERROR: ${error.message}`);
      else alert(`The sum is ${message.data}`);
    }
  });

  return (
    <div className="demo flex items-center justify-center gap-4">
      {worker.isLoading ? (
        <button className="border">Calculating...</button>
      ) : (
        <button className="primary" onClick={() => worker.postMessage(100000000)}>
          Calculate the sum of 1 to 100,000,000
        </button>
      )}
    </div>
  );
}

function calculateSum() {
  self.onmessage = message => {
    let sum = 0;
    for (let i = 1; i <= message.data; i++) sum += i;

    self.postMessage(sum);
  };
}
