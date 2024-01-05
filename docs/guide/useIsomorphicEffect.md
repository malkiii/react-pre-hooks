# useIsomorphicEffect

This hook is a replacement for [useEffect](https://react.dev/reference/react/useEffect) that works in both browser and server.

## Example Usage

```tsx
import { useIsomorphicEffect } from 'react-pre-hooks';

export default function Example() {
  useIsomorphicEffect(() => {
    console.log('Hello, world!');
  }, []);

  return <main></main>;
}
```
