import React from 'react';
import { useResizeObserver } from '.';

/**
 * @description
 * Handle the [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) API.
 */

/**
 * @example
 */
export function Example() {
  const { ref } = useResizeObserver({
    handler: entries => {
      const { width } = entries[0].contentRect;
      const percentage = ((width - minWidth) / (maxWidth - minWidth)) * 100;
      ref.current.style.color = `hsla(var(--deg), ${100 - percentage}%, ${50 + percentage / 2}%, 1)`;
    }
  });

  const maxWidth = 600;
  const minWidth = 240;

  return (
    <div className="demo h-[320px] dark:[--deg:200] [--deg:30] flex items-center justify-center *:[scrollbar-width:none]">
      <div
        ref={ref}
        style={{ maxWidth, minWidth }}
        className="wrapper p-5 resize-x overflow-auto mx-auto h-full"
      >
        <p className="invert dark:invert-0">
          The content box is the box in which content can be placed, meaning the border box minus
          the padding and border width. The border box encompasses the content, padding, and border.
        </p>
      </div>
    </div>
  );
}
