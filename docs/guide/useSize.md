# useSize

Track the element size easily using [useResizeObserver](./useResizeObserver).

## Options

- It takes [useIntersectionObserver options](./useResizeObserver#parameters).

## Return Values

| Name       | Type      | Description                   |
| ---------- | --------- | ----------------------------- |
| **ref**    | RefObject | the target element reference. |
| **width**  | Number    | the target's width.           |
| **height** | Number    | the target's height.          |

## Example Usage

```tsx
import { useSize } from 'realtime-hooks';

export default function Example() {
  const { ref, width, height } = useSize<HTMLTextAreaElement>();

  return (
    <main>
      <textarea ref={ref} disabled>
        Resize me!
      </textarea>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usesize-zt7jfj?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useSize" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
