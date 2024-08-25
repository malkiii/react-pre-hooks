import React from 'react';
import { useClickAway } from '.';
import { useBoolean } from '../useBoolean';

/**
 * @description
 * Execute a function when the user clicks outside a target element.
 */

/**
 * @example
 */
export function Menu() {
  const [isOpen, toggle] = useBoolean();
  const ref = useClickAway({ handler: () => toggle(false) });

  return (
    <div className="demo h-[240px]">
      <div className="relative w-fit mx-auto">
        <button
          onClick={e => {
            e.stopPropagation(); // cancel the click away event
            toggle();
          }}
          className="primary"
        >
          Open Modal
          <span
            className="inline-block ml-2 font-mono transition-all duration-200"
            style={{ rotate: isOpen ? '-90deg' : '90deg' }}
          >
            &gt;
          </span>
        </button>
        {isOpen && (
          <div
            ref={ref}
            role="list"
            className="p-2 animate-in fade-in border dark:bg-[#111] bg-slate-50 rounded-md absolute top-full left-0 translate-y-2 duration-200 space-y-2 shadow-xl min-w-full"
          >
            <a href="#" className="border">
              Item 1
            </a>
            <a href="#" className="border">
              Item 2
            </a>
            <a href="#" className="border">
              Item 3
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
