# usePageVisibility

Check if the tab contents is visible or hidden using this hook.

## Return Values

a `boolean` value determines whether the page tab is **visible** or not.

## Example Usage

```tsx
import { useEffect } from 'react';
import { usePageVisibility } from 'realtime-hooks';

export default function Example() {
  const isVisible = usePageVisibility();

  useEffect(() => {
    console.log('the page is', isVisible ? 'visible' : 'hidden');
  }, [isVisible]);

  return <main>Go to another tab and see the console..</main>;
}
```
