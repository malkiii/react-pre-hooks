# useOrientation

Track the screen orientation type using this hook.

## Return Values

the screen [orientation type](https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation/type) that can be `portrait-primary`, `portrait-secondary`, `landscape-primary`, or `landscape-secondary`

## Example Usage

```tsx
import { useOrientation } from 'realtime-hooks';

export default function Example() {
  const type = useOrientation();

  return (
    <main>
      <p>
        The orientation is <span>{type}</span>.
      </p>
    </main>
  );
}
```
