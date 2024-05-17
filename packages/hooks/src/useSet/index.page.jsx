import React from 'react';
import { useSet } from '.';

/**
 * @description
 * Use a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
 * state with some common and simple set methods.
 */

/**
 * @example
 */
export function GatheringGame() {
  const numbers = useSet([1, 2, 3]);

  return (
    <div className="demo">
      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <button
          className="primary justify-center"
          onClick={() => numbers.add(Math.floor(Math.random() * 10))}
        >
          {numbers.size === 10 ? 'Congratulations!' : 'Click to gather all numbers'}
        </button>
        <div className="wrapper grid grid-cols-[repeat(auto-fill,minmax(4rem,1fr))] gap-2 min-h-10 *:flex *:items-center *:justify-center">
          {numbers.toArray().map(number => (
            <span key={number} className="border rounded-md p-2 aspect-square w-full">
              {number}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
