# useColorScheme

you can track the system color scheme using this hook.

## Return Values

It returns the current system color scheme (`dark` or `light`).

## Example Usage

```tsx
import { useColorScheme } from 'realtime-hooks';

export default function Example() {
  const colorScheme = useColorScheme();

  return (
    <main style={{ colorScheme }}>
      <p>
        System color scheme is <span>{colorScheme}</span>.
      </p>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usecolorscheme-zrp855?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useColorScheme" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
