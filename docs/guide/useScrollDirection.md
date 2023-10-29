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
import { useScrollDirection } from 'realtime-hooks';

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
