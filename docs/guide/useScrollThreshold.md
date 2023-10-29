# useScrollThreshold

Returns a boolean state that indicates if the user has **passed** a specified scroll threshold.

## Parameters

1. It can be:

- a custom scroll event handler that returns a `boolean` which indicates if the user has passed the threshold or not.
- or an object that has the scroll offset `top`, `bottom`, `left`, and `right` values.

::: info
If you specified a custom scroll threshold `handler`, the **offset** values will not work.
:::

2. the target element reference (default is `window`).

## Return Values

| Name       | Type      | Description                                     |
| ---------- | --------- | ----------------------------------------------- |
| **ref**    | RefObject | the target element reference.                   |
| **passed** | Boolean   | indicates if the user has passed the threshold. |

## Example Usage

1. Using a custom handler:

```tsx
import { useScrollThreshold } from 'realtime-hooks';

export default function Example() {
  const { passed } = useScrollThreshold(() => {
    return window.scrollY > 650;
  });

  return (
    <main>
      <p>Scroll down..</p>
      <div className={passed ? 'show' : ''}>You've reached the end!</div>
    </main>
  );
}
```

2. Using the offset values:

```tsx
import { useScrollThreshold } from 'realtime-hooks';

export default function Example() {
  const { passed } = useScrollThreshold({ bottom: 200 });

  return (
    <main>
      <p>Scroll down..</p>
      <div className={passed ? 'show' : ''}>You've reached the end!</div>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usescrollend-cpxcgv?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useScrollEnd" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
