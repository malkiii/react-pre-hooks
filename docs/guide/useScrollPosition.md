# useScrollPosition

This hook tracks the scroll `position` and `progress` of a target element.

## Parameters

- the `ref` object of the target element (default is `window`).

## Return Values

| Name          | Type      | Description                     |
| ------------- | --------- | ------------------------------- |
| **ref**       | RefObject | the target element reference.   |
| **x**         | Number    | the `x` scroll position.        |
| **y**         | Number    | the `y` scroll position.        |
| **progressX** | Number    | the `x` scroll progress in `%`. |
| **progressY** | Number    | the `y` scroll progress in `%`. |

## Example Usage

```tsx
import { useScrollPosition } from 'realtime-hooks';

export default function Example() {
  const { x, progressY } = useScrollPosition();

  return (
    <main>
      <p>
        x: {x}px, y: {progressY}%
      </p>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usescrollposition-6ffxw8?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useScrollPosition" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
