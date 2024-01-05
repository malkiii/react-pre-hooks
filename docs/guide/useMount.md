# useMount

Execute a callback function when the component is mounted, it's similar to `useEffect` with an empty dependency array.

## Example Usage

```tsx
import { useMount } from 'react-pre-hooks';

export default function Example() {
  useMount(() => {
    alert('the component is mounted!');
  });

  return <main></main>;
}
```
