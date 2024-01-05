# useScrollDirection

This hook detects the scroll **direction** of the window or a target element.

## Parameters

- the `ref` object of the target element (default is `window`).

## Return Values

| Name        | Type      | Description                               |
| ----------- | --------- | ----------------------------------------- |
| **ref**     | RefObject | the target element reference.             |
| **isUp**    | Boolean   | indicates if the user is scrolling up.    |
| **isDown**  | Boolean   | indicates if the user is scrolling down.  |
| **isLeft**  | Boolean   | indicates if the user is scrolling left.  |
| **isRight** | Boolean   | indicates if the user is scrolling right. |

## Example Usage

<!-- prettier-ignore -->
```tsx
import { useScrollDirection } from 'react-pre-hooks';

export default function Example() {
  const direction = useScrollDirection();

  return (
    <main>
      <p>
        You are scrolling {direction.isDown ? 'down' : direction.isUp ? 'up' : ''}.
      </p>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usescrolldirection-9ss6d2?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useScrollDirection" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
