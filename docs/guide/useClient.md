# useClient

A solution to fix the [hydration error](https://nextjs.org/docs/messages/react-hydration-error) in [Next.js](https://nextjs.org/docs#what-is-nextjs).

## Return Values

a `boolean` value ensure that the component renders on the client side.

## Example Usage

```tsx
import { useClient } from 'realtime-hooks';

export default function Example() {
  const isClient = useClient();

  return <h1>{isClient ? 'This is never prerendered' : 'Prerendered'}</h1>;
}
```
