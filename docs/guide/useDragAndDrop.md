# useDragAndDrop

You can handle the user **drag** actions on a container element using this hook, and it can also handle the mobile touches.

## Parameters

1. the drag action handler function that takes the [DragAction](#dragaction-object) object as a parameter.
2. and some drag options:

| Name        | Type      | Description                                            |
| ----------- | --------- | ------------------------------------------------------ |
| **ref**     | RefObject | the container element reference (default is `window`). |
| **touches** | Boolean   | include the mobile touches.                            |

## Return Values

a `ref` object of the **container** element.

### `DragAction` Object

| Name         | Type    | Description                                                                                                                                                                                         |
| ------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **type**     | String  | the drag type which can be `start`, `end`, or `moving`.                                                                                                                                             |
| **clientX**  | Number  | the `x` position.                                                                                                                                                                                   |
| **clientY**  | Number  | the `y` position.                                                                                                                                                                                   |
| **initialX** | Number  | the initial `x` position.                                                                                                                                                                           |
| **initialY** | Number  | the initial `y` position.                                                                                                                                                                           |
| **target**   | Element | the current dragged element in the container.                                                                                                                                                       |
| **event**    | Event   | the [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) or [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent) if you are using the `touches` property. |

## Example Usage

```tsx
import { useDragAndDrop } from 'react-pre-hooks';

export default function Example() {
  const ref = useDragAndDrop(
    action => {
      const target = action.target as HTMLSpanElement;

      target.style.left = action.clientX + 'px';
      target.style.top = action.clientY + 'px';
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

<iframe src="https://codesandbox.io/embed/usedraganddrop-9npfm4?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useDragAndDrop" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
