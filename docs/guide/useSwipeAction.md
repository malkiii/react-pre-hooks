# useSwipeAction

You can handle the user **swipe** actions using this hook, and it can also handle the mouse swipes.

## Parameters

| Name        | Type     | Description                                                                                                                                                                                                                                    |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **handler** | Function | the swipe event handler that takes the [`SwipeAction`](#swipeaction-event) object                                                                                                                                                              |
| **options** | Object   | the swipe options includs the `mouse` property which is a **boolean** that lets you track the mouse cursor swipes, and the target element ref (default is `window`) as well as the event listener [options](./useEventListener.md#parameters). |

## Return Values

a `ref` object of the target element.

## `SwipeAction` Event

| Name            | Type    | Description                                                                                                                                                                                       |
| --------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`state`**     | String  | the swipe state which can be `start`, `end`, or `moving`.                                                                                                                                         |
| **`deltaX`**    | Number  | the swipe distance `x` from the `initialX` value.                                                                                                                                                 |
| **`deltaY`**    | Number  | the swipe distance `y` from the `initialY` value.                                                                                                                                                 |
| **`initialX`**  | Number  | the initial `x` point.                                                                                                                                                                            |
| **`initialY`**  | Number  | the initial `y` point.                                                                                                                                                                            |
| **`direction`** | String  | the swipe direction which can be `UP`, `DOWN`, `RIGHT`, or `LEFT`.                                                                                                                                |
| **`isHolding`** | Boolean | determines whether the user is still swiping or not.                                                                                                                                              |
| **`event`**     | Event   | the [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent) or [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) if you are using the `mouse` property. |

## Example Usage

```tsx
import { useSwipeAction } from 'realtime-hooks';

let scrollX = 0;

export default function Example() {
  const ref = useSwipeAction(
    action => {
      if (action.state === 'start') scrollX = window.scrollX;

      window.scrollTo({ left: scrollX - action.deltaX });
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
