# useUpdateEffect

This hook is just like `useEffect` but ignores the component's first render.

## Example Usage

```tsx
import { useToggle, useUpdateEffect } from 'react-pre-hooks';

export default function Example() {
  const [value, toggle] = useToggle();

  useUpdateEffect(() => {
    console.log('This is not the first render!');
  }, [value]);

  return (
    <main>
      <button onClick={() => toggle()}>Rerender</button>
    </main>
  );
}
```
