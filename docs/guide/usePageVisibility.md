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

<iframe src="https://codesandbox.io/embed/usepagevisibility-572525?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="usePageVisibility" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
