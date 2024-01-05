# useUnmount

Execute a callback function **before** the component is unmounted (leaves the DOM).

## Example Usage

```tsx
import { useUnmount } from 'react-pre-hooks';

export default function Example() {
  useUnmount(() => {
    alert('the component is unmounting...');
  });

  return <main></main>;
}
```
