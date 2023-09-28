# useCursorType

This hook tracks the CSS cursor type value.

## Parameters

a `target` element (default is `window`).

## Return Values

| Name       | Type      | Description                                                                             |
| ---------- | --------- | --------------------------------------------------------------------------------------- |
| **ref**    | RefObject | the target element reference.                                                           |
| **cursor** | String    | the current CSS [cursor type](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor). |

## Example Usage

<!-- prettier-ignore -->
```tsx
import { useCursorType } from 'realtime-hooks';

export default function Example() {
  const { cursor } = useCursorType();

  return (
    <main>
      <div>Cursor is now: {cursor}</div>
      <button>Click</button>
      <textarea>
        Try to move the cursor throw the button, this textarea,
        and its resize button in the corner.
      </textarea>
    </main>
  );
}
```
