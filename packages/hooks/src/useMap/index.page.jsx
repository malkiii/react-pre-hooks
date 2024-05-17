import React from 'react';
import { useMap } from '.';
import { useFormData } from '../useFormData';

/**
 * @description
 * Use a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 * state with some common and simple map methods.
 */

/**
 * @example
 */
export function KeyValueList() {
  const form = useFormData();

  const map = useMap([
    ['A', 1],
    ['B', 2],
    ['C', 3]
  ]);

  return (
    <div className="demo h-[350px] overflow-auto">
      <div className="max-w-xl mx-auto">
        <form
          ref={form.ref}
          className="flex gap-4 mb-4"
          onSubmit={e => {
            e.preventDefault();
            map.set(form.get('key'), form.get('value'));
          }}
        >
          <input type="text" name="key" placeholder="Key" required className="flex-1" />
          <input type="text" name="value" placeholder="Value" required className="flex-1" />
          <button className="primary justify-center w-12">Add</button>
        </form>
        <ul className="*:list-none space-y-4">
          {map.entries().map(([key, value]) => (
            <li key={key} className="flex items-center justify-between gap-4">
              <span className="block flex-1 p-2 rounded-md border whitespace-nowrap overflow-hidden text-ellipsis">
                {key}
              </span>
              <span className="block flex-1 p-2 rounded-md border whitespace-nowrap overflow-hidden text-ellipsis">
                {value}
              </span>
              <button className="primary justify-center w-12" onClick={() => map.delete(key)}>
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
