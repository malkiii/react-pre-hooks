# useEventListener

Add one or multiple event listeners to a specific target element, `window`, or `document` object, if you're using [typescript](https://www.typescriptlang.org/) you will get **auto-completion** for the event listeners.

## Parameters

1. the specified event(s).
2. the event(s) handler.
3. the [addEventListener options](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options), as well as the `target` object that can be an **element** or a **ref** object element that has `addEventListener` method.

::: warning
You must always specify a `target` object otherwise it will not work.
:::

## Example Usage

1. Using a single event:

```tsx
import { useEventListener } from 'react-pre-hooks';

export default function Example() {
  useEventListener(
    'resize',
    event => {
      console.log('width', window.innerWidth, ', height', window.innerHeight);
    },
    { target: window }
  );

  return <main></main>;
}
```

2. Using a multiple events:

```tsx
import { useRef } from 'react';
import { useEventListener } from 'react-pre-hooks';

export default function Example() {
  const ref = useRef<HTMLDivElement>(null);

  useEventListener(
    ['click', 'mousemove'],
    event => {
      console.log({ x: event.offsetX, y: event.offsetY });
    },
    { target: ref }
  );

  return <div ref={ref}>Click or move your cursor..</div>;
}
```

<iframe src="https://codesandbox.io/embed/useeventlistener-9mc82y?expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useEventListener" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
