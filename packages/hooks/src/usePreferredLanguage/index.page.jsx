import React from 'react';
import { usePreferredLanguage } from '.';

/**
 * @description
 * Get the user's preferred language from the browser.
 */

/**
 * @example
 */
export function Example() {
  const lang = usePreferredLanguage();

  return (
    <div className="demo flex items-center justify-center">
      <p className="text-center text-balance">
        Preferred language is <span className="underline underline-offset-4">{lang?.name}</span>.
      </p>
    </div>
  );
}
