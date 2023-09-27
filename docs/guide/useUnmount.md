# useUnmount

Execute a callback function **before** the component is unmounted (leaves the DOM).

## Example Usage

```tsx
import { useUnmount } from 'realtime-hooks';

export default function Example() {
  useUnmount(() => {
    alert('the component is unmounting...');
  });

  return <main></main>;
}
```
