# useHover

This hook returns whether the target element is hovered or not, and it can use a `delay` value as well for both hover and unhover events.

## Options

| Name      | Type             | Description                                                  |
| --------- | ---------------- | ------------------------------------------------------------ |
| **ref**   | RefObject        | the target element reference.                                |
| **delay** | Number or Object | a delay value for both `hover` and `unhover` events in `ms`. |

## Return Values

| Name          | Type      | Description                            |
| ------------- | --------- | -------------------------------------- |
| **ref**       | RefObject | the target element reference.          |
| **isHovered** | Boolean   | whether the element is hovered or not. |

## Example Usage

```tsx
import { useHover } from 'realtime-hooks';

export default function Example() {
  const { targetRef, isHovered } = useHover({ hover: 300, unhover: 750 });

  return (
    <main>
      <div ref={targetRef}>
        {isHovered && <span>This is a tooltip!</span>}
        {isHovered ? 'unhover' : 'hover'}
      </div>
    </main>
  );
}
```
