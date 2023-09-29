# useSize

Track the element size easily using [`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

## Options

| Name           | Type    | Description                                                                                                   |
| -------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| **target**     | Element | the target element (default is the `body` element).                                                           |
| **...options** | Object  | the [ResizeObserver options](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/observe#options) |

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
      <textarea ref={ref} disabled></textarea>
    </main>
  );
}
```
