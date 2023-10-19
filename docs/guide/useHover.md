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
  const { ref, isHovered } = useHover({ delay: { hover: 300, unhover: 750 } });

  return (
    <main>
      <div ref={ref}>
        {isHovered && <span>This is a tooltip!</span>}
        {isHovered ? 'unhover' : 'hover'}
      </div>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usehover-c356cz?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useHover" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
