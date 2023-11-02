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
import { useMousePosition } from 'realtime-hooks';

export default function Example() {
  const { ref, x, y } = useMousePosition();

  return (
    <main>
      <p>
        x: {x}px, y: {y}px
      </p>
      <div ref={ref}></div>
    </main>
  );
}
```
