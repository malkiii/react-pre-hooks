import React from 'react';
import { useKeyboard } from '.';

/**
 * @description
 * Bind any keyboard **keys** or **hotkeys** with handlers in a very simple way.
 */

/**
 * @example
 */
export function Example() {
  useKeyboard({
    keys: {
      'F': () => alert('you pressed F'),
      '1|2|3': e => alert(`you pressed the number ${e.key}`),
      'Ctrl+c': () => alert('you copied something')
    },
    separator: '|' // default
  });

  return (
    <div className="demo flex items-center justify-center">
      <p>
        Press <kbd>F</kbd>, <kbd>1</kbd>, <kbd>2</kbd>, <kbd>3</kbd>, or <kbd>Ctrl</kbd> +{' '}
        <kbd>C</kbd>
      </p>
    </div>
  );
}

/**
 * @info
 * You can use any string case you want for the key codes, for example:
 *
 * - `ctrl+f` is valid.
 * - `Ctrl + F` is valid.
 * - `ctrl + KeyF` is also valid.
 *
 */
