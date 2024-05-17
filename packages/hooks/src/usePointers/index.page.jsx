import React from 'react';
import { usePointers } from '.';

/**
 * @description
 * Handle all the user [pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) at once.
 */

/**
 * @example
 */
export function PointerSpace() {
  const ref = usePointers({
    handler: (event, list) => {
      const pointer = list[list.length - 1];
      if (!pointer) {
        return document.getElementById(event.pointerId)?.remove();
      }

      const id = pointer.pointerId.toString();
      let circle = document.getElementById(id);

      if (!circle) {
        circle = document.createElement('div');
        circle.id = id;
      }

      const rect = ref.current.getBoundingClientRect();

      circle.style.top = pointer.y - rect.top + 'px';
      circle.style.left = pointer.x - rect.left + 'px';
      circle.style.width = pointer.width + 'px';

      if (pointer.type === 'pointerdown') {
        ref.current.appendChild(circle);
      }
    }
  });

  return (
    <div className="demo relative min-h-[420px] flex items-center justify-center select-none cursor-pointer">
      <p className="text-center text-balance">Start pointing with your fingers or mouse.</p>
      <div
        ref={ref}
        style={{ touchAction: 'none' }}
        className="absolute inset-0 *:aspect-square *:min-w-8 *:rounded-full *:-translate-x-1/2 *:-translate-y-1/2 *:absolute *:backdrop-invert *:pointer-events-none"
      ></div>
    </div>
  );
}

/**
 * @tip
 * Some browsers has a built-in touch actions, so if you try to use it the browsers will cancel it,
 * you can disable these defaut touch actions in CSS using `touch-action: none`
 */
