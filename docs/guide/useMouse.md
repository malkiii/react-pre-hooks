# useMouse

Track the mouse position and state in a specific target element.

## Options

| Name        | Type      | Description                                                         |
| ----------- | --------- | ------------------------------------------------------------------- |
| **ref**     | RefObject | the target element reference (default is `window`).                 |
| **touches** | Boolean   | whether it should also consider `touches` in mobile devices or not. |

## Return Values

| Name       | Type      | Description                                                |
| ---------- | --------- | ---------------------------------------------------------- |
| **ref**    | RefObject | the target element reference.                              |
| **x**      | Number    | the `x` position of the mouse/touch.                       |
| **y**      | Number    | the `y` position of the mouse/touch.                       |
| **isOut**  | Boolean   | whether the mouse is outside of the target element or not. |
| **isDown** | Boolean   | whether the mouse click/touch is down or up.               |

## Example Usage

```tsx
import { useMouse } from 'realtime-hooks';

export default function Example() {
  const mouse = useMouse();

  return (
    <main>
      <div style={{ left: mouse.x + 'px', top: mouse.y + 'px' }}></div>
    </main>
  );
}
```
