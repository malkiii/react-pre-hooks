import React from 'react';
import { useClipboard } from '.';

/**
 * @description
 * Copy and paste text using the clipboard with a **copied** state.
 */

/**
 * @example
 */
export function Example() {
  const clipboard = useClipboard();

  return (
    <div className="demo">
      <div className="max-w-xl mx-auto">
        <textarea
          className="focus-visible:ring focus-visible:outline outline-[3px] outline-primary resize-none h-[180px]"
          placeholder="Copy or past text here..."
          spellCheck={false}
        ></textarea>
        <div className="grid grid-cols-2 mt-4 gap-4 *:justify-center">
          <button
            className="primary"
            onClick={() => clipboard.copy(document.querySelector('textarea').value)}
          >
            {clipboard.isCopied ? 'Copied' : 'Copy'}
          </button>
          <button
            className="border"
            onClick={() => {
              clipboard.paste().then(text => (document.querySelector('textarea').value += text));
            }}
          >
            Past
          </button>
        </div>
      </div>
    </div>
  );
}
