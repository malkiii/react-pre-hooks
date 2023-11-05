# useInView

This hook uses [useIntersectionObserver](./useIntersectionObserver) hook and returns the intersecting state.

## Options

- It takes [useIntersectionObserver options](./useIntersectionObserver#parameters), as well as the `once` property that determines if it should observe the target element just for **one** time.

## Return Values

| Name         | Type      | Description                                                                                                                       |
| ------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **ref**      | RefObject | the target element reference.                                                                                                     |
| **isInView** | Boolean   | whether the target element is in the view or not, if set `once` to **true**, it will not change after the target is intersecting. |

## Example Usage

<!-- prettier-ignore -->
```tsx
import { useInView } from 'realtime-hooks';

export default function Example() {
  const { ref, isInView } = useInView({ threshold: 0.85 });

  return (
    <main>
      <p>Scroll down..</p>
      <div ref={ref} className={isInView ? "show" : ""}></div>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/useinview-pywf6m?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useInView" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
