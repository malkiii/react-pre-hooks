import React from 'react';
import { useArray } from '.';

/**
 * @description
 * Use an array state with some common and simple array methods.
 */

/**
 * @example
 */
export function TodoList() {
  const tasks = useArray(['Task #1', 'Task #2']);

  const addTask = e => {
    e.preventDefault();
    const value = document.getElementById('task').value;
    if (value) tasks.push(value);
  };

  return (
    <div className="demo h-[350px] overflow-auto">
      <div className="max-w-xl mx-auto">
        <form className="flex gap-4 mb-4" onSubmit={addTask}>
          <input type="text" id="task" placeholder="Add a task..." required />
          <button className="primary">Add</button>
        </form>
        <ul className="*:list-none space-y-4">
          {tasks.values.map((value, index) => (
            <li className="wrapper flex items-center justify-between" key={index}>
              <span className="block flex-grow whitespace-nowrap overflow-hidden text-ellipsis">
                {value}
              </span>
              <button className="primary" onClick={() => tasks.pop(index)}>
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
