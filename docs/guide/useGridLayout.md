# useGridLayout

Track the number of **rows** and **columns** of a grid layout using this hook.

## Parameters

- the `ref` object of the target element.

## Return Values

| Name        | Type      | Description                   |
| ----------- | --------- | ----------------------------- |
| **ref**     | RefObject | the target element reference. |
| **rows**    | Number    | the grid rows number.         |
| **columns** | Number    | the grid columns number.      |

## Example Usage

```tsx
import { useGridLayout } from 'realtime-hooks';

export default function Example() {
  const { ref, rows, columns } = useGridLayout();

  return (
    <main>
      <p>
        Rows: {rows}, Columns: {columns}
      </p>
      <div ref={ref} style={{ display: 'grid' }}>
        {new Array(12).fill(null).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/rt7jsp?view=Editor+%2B+Preview&module=%2Fsrc%2FComponent.tsx&hidenavigation=1" style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;" title="useGridLayout" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
