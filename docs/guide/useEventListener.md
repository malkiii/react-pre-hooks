# useEventListener

Add one or multiple event listeners to a specific target element, `window`, or `document` object, if you're using [typescript](https://www.typescriptlang.org/) you will get **auto-completion** for the event listeners.

## Parameters

| Name         | Type            | Description                                                                                                                                                                                                                                   |
| ------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **event(s)** | String or Array | the specified event(s).                                                                                                                                                                                                                       |
| **handler**  | Function        | the event(s) handler.                                                                                                                                                                                                                         |
| **options**  | Object          | specify the `ref` object that can be an **element** or a **ref** object element that has `addEventListener`, as well as the [addEventListener options](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options) |

::: warning
You must always specify a `ref` object otherwise it will not work.
:::

## Example Usage

1. Using a single event:

```tsx
import { useEventListener } from 'realtime-hooks';

export default function Example() {
  useEventListener(
    'resize',
    event => {
      console.log('width', window.innerWidth, ', height', window.innerHeight);
    },
    { ref: window }
  );

  return <main></main>;
}
```

2. Using a multiple events:

```tsx
import { useRef } from 'react';
import { useEventListener } from 'realtime-hooks';

export default function Example() {
  const ref = useRef<HTMLDivElement>(null);

  useEventListener(
    ['click', 'mousemove'],
    event => {
      console.log({ x: event.offsetX, y: event.offsetY });
    },
    { ref }
  );

  return <div ref={ref}></div>;
}
```
