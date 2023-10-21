# useScroll

This hook tracks the scroll `position` ,`progress` and `direction` of a target element.

## Parameters

a `ref` object of the target element (default is `window`).

## Return Values

| Name              | Type      | Description                                                      |
| ----------------- | --------- | ---------------------------------------------------------------- |
| **ref**           | RefObject | the target element reference.                                    |
| **x**             | Number    | the `x` scroll position.                                         |
| **y**             | Number    | the `y` scroll position.                                         |
| **progressX**     | Number    | the `x` scroll progress in `%`.                                  |
| **progressY**     | Number    | the `y` scroll progress in `%`.                                  |
| **isScrollRight** | Boolean   | whether the user is scrolling in the **right** direction or not. |
| **isScrollDown**  | Boolean   | whether the user is scrolling **down** or not.                   |

## Example Usage

```tsx
import { useScroll } from 'realtime-hooks';

export default function Example() {
  const { x, y, isScrollDown } = useScroll();

  return (
    <main>
      <p>
        x: {x}px, y: {y}px, You are scrolling {isScrollDown ? 'down' : 'up'}
      </p>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usescroll-6ffxw8?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useScroll" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
