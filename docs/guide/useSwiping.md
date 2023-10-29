# useSwiping

You can handle the user **swipe** actions using this hook, and it can also handle the mouse swipes.

## Parameters

1.  the swipe action handler function that takes the [SwipeAction](#swipeaction-object) object as a parameter.
2.  the swipe options:

| Name      | Type      | Description                                            |
| --------- | --------- | ------------------------------------------------------ |
| **ref**   | RefObject | the container element reference (default is `window`). |
| **mosue** | Boolean   | include the mouse cursor swipes.                       |

## Return Values

a `ref` object of the target element.

### `SwipeAction` Object

| Name            | Type    | Description                                                                                                                                                                                       |
| --------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`state`**     | String  | the swipe state which can be `start`, `end`, or `moving`.                                                                                                                                         |
| **`deltaX`**    | Number  | the swipe distance `x` from the `initialX` value.                                                                                                                                                 |
| **`deltaY`**    | Number  | the swipe distance `y` from the `initialY` value.                                                                                                                                                 |
| **`initialX`**  | Number  | the initial `x` position.                                                                                                                                                                         |
| **`initialY`**  | Number  | the initial `y` position.                                                                                                                                                                         |
| **`direction`** | String  | the swipe direction which can be `UP`, `DOWN`, `RIGHT`, or `LEFT`.                                                                                                                                |
| **`isHolding`** | Boolean | determines whether the user is still swiping or not.                                                                                                                                              |
| **`event`**     | Event   | the [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent) or [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) if you are using the `mouse` property. |

## Example Usage

```tsx
import { useSwiping } from 'realtime-hooks';

let start = 0;

export default function Slider() {
  const ref = useSwiping(
    action => {
      if (action.state === 'start') start = window.scrollX;

      window.scrollTo({ left: start + action.deltaX });
    },
    { mouse: true }
  );

  return (
    <div ref={ref}>
      <ul>
        {new Array(10).fill(null).map((_, i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
```

<iframe src="https://codesandbox.io/embed/useswiping-j743lq?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useSwiping" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
