# useScrollEnd

Execute a callback when the scrolling is close to the end with a specific `offset`, and it can be used for infinite scrolling.

## Parameters

It takes a callback function that will execute when the user reaches or moves away from the end of the scroll, and takes a `boolean` value as a parameter indicating whether it reaches the end or the opposite, and some [options](#options).

## Options

| Name           | Type      | Description                                                     |
| -------------- | --------- | --------------------------------------------------------------- |
| **ref**        | RefObject | the target element reference (default is `window`).             |
| **offset**     | Number    | the distance before reaching the scroll end (default is `5`px). |
| **horizontal** | Boolean   | use horizontal scrolling (default is `false`).                  |

## Return Values

a `ref` object of the target element.

## Example Usage

```tsx
import { useState } from 'react';
import { useScrollEnd } from 'realtime-hooks';

export default function Example() {
  useScrollEnd(
    canShow => {
      document.querySelector('#popup')?.classList.toggle('show', canShow);
    },
    { offset: 200 }
  );

  return (
    <main>
      <div id="popup">You've reached the end!</div>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usescrollend-cpxcgv?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useScrollEnd" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
