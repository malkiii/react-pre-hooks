# useOrientation

Track the screen orientation type using this hook.

## Return Values

the screen [orientation type](https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation/type) that can be `portrait-primary`, `portrait-secondary`, `landscape-primary`, or `landscape-secondary`

## Example Usage

```tsx
import { useOrientation } from 'react-pre-hooks';

export default function Example() {
  const type = useOrientation();

  return (
    <main>
      <p>
        The orientation is <span>{type}</span>.
      </p>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/lwclk9?view=Editor+%2B+Preview&module=%2Fsrc%2FComponent.tsx&hidenavigation=1" style="width:100%; height: 500px; border:0; overflow:hidden;" title="useOrientation" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
