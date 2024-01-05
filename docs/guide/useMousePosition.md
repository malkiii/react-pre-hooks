# useMousePosition

This hook tracks the mouse cursor `position` of a target element.

## Parameters

- the `ref` object of the target element (default is `window`).

## Return Values

| Name    | Type      | Description                   |
| ------- | --------- | ----------------------------- |
| **ref** | RefObject | the target element reference. |
| **x**   | Number    | the `x` position.             |
| **y**   | Number    | the `y` position.             |

## Example Usage

```tsx
import { useMousePosition } from 'react-pre-hooks';

export default function Trailer() {
  const { x: left, y: top } = useMousePosition();

  return (
    <main>
      <div style={{ top, left }}></div>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usemouseposition-qscls2?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useMousePosition" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
