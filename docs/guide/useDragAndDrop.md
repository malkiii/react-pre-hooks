# useDragAndDrop

You can handle the user **drag** actions on a container element using this hook, and it can also handle the mobile touches.

## Parameters

| Name        | Type     | Description                                                                                                                                                                                                                                   |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **handler** | Function | the drag action handler that takes the [`DragAction`](#dragaction-object) object                                                                                                                                                              |
| **options** | Object   | the drag options includs the `touches` property which is a **boolean** that lets you track the mobile touches, and the container element ref (default is `window`) as well as the event listener [options](./useEventListener.md#parameters). |

## Return Values

a `ref` object of the **container** element.

### `DragAction` Object

| Name           | Type    | Description                                                                                                                                                                                         |
| -------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`state`**    | String  | the drag state which can be `start`, `end`, or `dragging`.                                                                                                                                          |
| **`offsetX`**  | Number  | the `x` position.                                                                                                                                                                                   |
| **`offsetY`**  | Number  | the `y` position.                                                                                                                                                                                   |
| **`initialX`** | Number  | the initial `x` position.                                                                                                                                                                           |
| **`initialY`** | Number  | the initial `y` position.                                                                                                                                                                           |
| **`target`**   | Element | the current dragged element in the container.                                                                                                                                                       |
| **`event`**    | Event   | the [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) or [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent) if you are using the `touches` property. |

## Example Usage

```tsx
import { useDragAndDrop } from 'realtime-hooks';

export default function Example() {
  const ref = useDragAndDrop(
    action => {
      const target = action.target as HTMLSpanElement;

      target.style.left = action.offsetX + 'px';
      target.style.top = action.offsetY + 'px';
    },
    { touches: true }
  );

  return (
    <div ref={ref}>
      <span>Drag me!</span>
    </div>
  );
}
```
