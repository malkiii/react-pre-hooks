# useColorScheme

you can track the system color scheme using this hook.

## Return Values

It returns the current system color scheme (`dark` or `light`).

## Example Usage

```tsx
import { useColorScheme } from 'realtime-hooks';

export default function Example() {
  const colorScheme = useColorScheme();

  return (
    <main style={{ colorScheme }}>
      <p>Color Scheme is {colorScheme}.</p>
    </main>
  );
}
```
