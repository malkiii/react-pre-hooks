# useIntersection

Handles the [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) and returns the intersecting state.

## Options

| Name           | Type     | Description                                                                                                                                                           |
| -------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **target**     | Element  | the target element.                                                                                                                                                   |
| **handler**    | Function | the `IntersectionObserver` [handler](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#callback).                            |
| **once**       | Boolean  | should observe the target element just for one time.                                                                                                                  |
| **...options** | Object   | the [IntersectionObserver options](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#options) such as `root`, `threshold`... |

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
  const { ref, isIntersecting } = useIntersection({
    threshold: 100,
    handler: () => console.log('the element is in the view!')
  });

  return (
    <main>
      <div className={isIntersecting ? 'view' : ''}>
        {isIntersecting ? 'Hey' : 'Bye'}
      </div>
    </main>
  );
}
```
