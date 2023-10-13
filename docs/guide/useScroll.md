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
  const { ref, x, y, isScrollDown } = useScroll();

  return (
    <main>
      <div>
        x: {x}px, y: {y}px, You are scrolling {isScrollDown ? 'down' : 'up'}
      </div>
      <div ref={ref}></div>
    </main>
  );
}
```
