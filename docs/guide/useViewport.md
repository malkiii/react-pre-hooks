# useViewport

Track the screen **viewport** (screen width and height).

## Return Values

| Name       | Type   | Description          |
| ---------- | ------ | -------------------- |
| **width**  | Number | the viewport width.  |
| **height** | Number | the viewport height. |

## Example Usage

```tsx
import { useViewport } from 'realtime-hooks';

export default function Example() {
  const { width, height } = useViewport();

  return (
    <main>
      <h1>Resize the window.</h1>
      <p>
        width: {width}, height: {height}
      </p>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/useviewport-g889x8?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useViewport" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
