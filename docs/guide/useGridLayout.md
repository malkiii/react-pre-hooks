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
  const { rows, columns } = useGridLayout();

  return (
    <main>
      <p>
        rows: {rows}, columns: {columns}
      </p>
      <div ref={ref} style={{ display: 'grid' }}></div>
    </main>
  );
}
```
