# useBeforeUnload

Stop the user before closing the window using this hook.

## Parameters

- Any value, if it's a `falsy` value, it will be ignored, or it can be a `function` that returns the value.

## Example Usage

```tsx
import { useBeforeUnload } from 'react-pre-hooks';

export default function Example() {
  useBeforeUnload('Good Bye!');

  return (
    <main>
      <p>You can close this window.</p>
    </main>
  );
}
```
