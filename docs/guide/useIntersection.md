# useIntersection

Handles the [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) and returns the intersecting state.

## Options

| Name           | Type      | Description                                                                                                                                                           |
| -------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ref**        | RefObject | the target element reference.                                                                                                                                         |
| **handler**    | Function  | the `IntersectionObserver` [handler](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#callback).                            |
| **once**       | Boolean   | should observe the target element just for one time.                                                                                                                  |
| **...options** | Object    | the [IntersectionObserver options](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#options) such as `root`, `threshold`... |

## Return Values

| Name               | Type      | Description                                                                                                                       |
| ------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **ref**            | RefObject | the target element reference.                                                                                                     |
| **isIntersecting** | Boolean   | whether the target element is in the view or not, if set `once` to **true**, it will not change after the target is intersecting. |

## Example Usage

<!-- prettier-ignore -->
```tsx
import { useIntersection } from 'realtime-hooks';

export default function Example() {
  const { ref, isIntersecting } = useIntersection({ threshold: 0.85 });

  return (
    <main>
      <p>Scroll down..</p>
      <div ref={ref} className={isIntersecting ? "show" : ""}></div>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/useintersection-pywf6m?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useIntersection" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
