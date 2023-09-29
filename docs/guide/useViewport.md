# useViewport

Track the screen **viewport** (screen width and height) and **orientation**.

## Return Values

| Name            | Type   | Description                                                                                                                |
| --------------- | ------ | -------------------------------------------------------------------------------------------------------------------------- |
| **width**       | Number | the viewport width.                                                                                                        |
| **height**      | Number | the viewport height.                                                                                                       |
| **orientation** | String | the screen orientation that can be `portrait-primary`, `portrait-secondary`, `landscape-primary`, or `landscape-secondary` |

## Example Usage

```tsx
import { useViewport } from 'realtime-hooks';

export default function Example() {
  const { width, height, orientation } = useViewport();

  return (
    <main>
      <p>
        width: {width}, height: {height}
      </p>
      <p>the orientation is {orientation}</p>
    </main>
  );
}
```
