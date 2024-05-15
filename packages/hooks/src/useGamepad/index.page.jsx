import React from 'react';
import { useGamepad } from '.';

/**
 * @description
 * Handle the user gamepad connections and changes.
 */

/**
 * @example
 */
export function Example() {
  const isConnected = useGamepad({
    index: 0,
    handler: gamepad => {}
  });

  return (
    <div className="demo">
      <div className="max-w-xl mx-auto uppercase font-light select-none [&_span]:flex [&_span]:items-center [&_span]:justify-center">
        <div className="flex justify-between w-3/5 mx-auto">
          <div className="flex gap-2 w-2/5 *:border *:rounded-md *:w-1/2 *:min-w-fit *:px-2">
            <span id="LT">LT</span>
            <span id="LB">LB</span>
          </div>
          <div className="flex gap-2 w-2/5 *:border *:rounded-md *:w-1/2">
            <span id="RB">RB</span>
            <span id="RT">RT</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="aspect-square w-[27%] *:relative *:w-1/3 flex items-center justify-center">
            <span
              id="LEFT"
              className="rounded-full border aspect-square after:border-[.5rem] after:border-solid after:border-transparent after:border-r-current after:-translate-x-1/3"
            ></span>
            <div className="-mx-1">
              <span
                id="UP"
                className="rounded-full border aspect-square after:border-[.5rem] after:border-solid after:border-transparent after:border-b-current after:-translate-y-1/3"
              ></span>
              <div className="block w-full aspect-square -my-1"></div>
              <span
                id="DOWN"
                className="rounded-full border aspect-square after:border-[.5rem] after:border-solid after:border-transparent after:border-t-current after:translate-y-1/3"
              ></span>
            </div>
            <span
              id="RIGHT"
              className="rounded-full border aspect-square after:border-[.5rem] after:border-solid after:border-transparent after:border-l-current after:translate-x-1/3"
            ></span>
          </div>
          <div className="flex flex-col items-center justify-center w-1/2 gap-6 max-lg:gap-3">
            <div
              className="rounded-full aspect-square w-[10%] reverse"
              style={{
                background: isConnected ? '#00aaff' : '#ff2525'
              }}
            ></div>
            <div className="*:border text-sm *:min-w-fit *:p-1 flex justify-center gap-4">
              <span id="SELECT" className="rounded-md">
                select
              </span>
              <span id="START" className="rounded-md">
                start
              </span>
            </div>
          </div>
          <div className="aspect-square w-[27%] *:w-1/3 flex items-center justify-center">
            <span id="X" className="rounded-full border aspect-square">
              X
            </span>
            <div className="-mx-1">
              <span id="Y" className="rounded-full border w-full aspect-square">
                Y
              </span>
              <div className="block w-full aspect-square -my-1"></div>
              <span id="A" className="rounded-full border w-full aspect-square">
                A
              </span>
            </div>
            <span id="B" className="rounded-full border aspect-square">
              B
            </span>
          </div>
        </div>
        <div className="flex justify-between w-3/5 mx-auto *:aspect-square *:rounded-full *:border *:*:size-full *:*:border *:*:rounded-[inherit] lg:-mt-4 *:w-1/4">
          <div className="flex items-center justify-center *:size-[70%]">
            <div
              id="left-stick"
              className="bg-[radial-gradient(var(--border-color)_1px,transparent_0)] [background-size:7px_7px]"
            ></div>
          </div>
          <div className="flex items-center justify-center *:size-[70%]">
            <div
              id="right-stick"
              className="bg-[radial-gradient(var(--border-color)_1px,transparent_0)] [background-size:7px_7px]"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
