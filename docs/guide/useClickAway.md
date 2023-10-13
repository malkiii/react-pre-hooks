# useClickAway

Execute a function when the user clicks outside a target element.

## Options

| Name    | Type      | Description                   |
| ------- | --------- | ----------------------------- |
| **ref** | RefObject | the target element reference. |

## Return Values

a `ref` object of the target element.

## Example Usage

```tsx
import { useClickAway } from 'realtime-hooks';

export default function Example() {
  const ref = useClickAway(() => ref.current.classList.remove('show'));

  return (
    <main>
      <button onClick={() => ref.current.classList.add('show')}>Open</button>
      <div id="modal" ref={ref}>
        <strong>Click Outside!</strong>
        <p>to close this modal.</p>
      </div>
    </main>
  );
}
```
