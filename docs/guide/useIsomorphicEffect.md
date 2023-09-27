# useIsomorphicEffect

This hook works in both browser and server, it uses [useEffect](https://react.dev/reference/react/useEffect) on the client side, and [useLayoutEffect](https://react.dev/reference/react/useLayoutEffect) on the server side.

## Example Usage

```tsx
import { useIsomorphicEffect } from 'realtime-hooks';

export default function Example() {
  useIsomorphicEffect(() => {
    console.log('Hello, world!');
  }, []);

  return <main></main>;
}
```
