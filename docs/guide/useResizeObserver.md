# useResizeObserver

Handle the [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) using this hook.

## Parameters

1. the [ResizeObserver callback](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/ResizeObserver#callback) function.
2. the [ResizeObserver options](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/observe#options), as well as the `ref` object of the target element.

## Return Values

| Name         | Type      | Description                                                                                                            |
| ------------ | --------- | ---------------------------------------------------------------------------------------------------------------------- |
| **ref**      | RefObject | the target element reference.                                                                                          |
| **observer** | RefObject | the [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/ResizeObserver) object reference. |

## Example Usage

::: tip
Just use [useSize](./useSize) if you want to get an element size in a state.
:::

```tsx
import { useResizeObserver } from 'realtime-hooks';

export default function Example() {
  const { ref } = useResizeObserver(entries => {
    const { width, height } = entries[0].contentRect;
    console.log({ width, height });
  });

  return (
    <main>
      <div ref={ref}>Resize the window!</div>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/useresizeobserver-gqcx6s?expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useResizeObserver" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
