# usePointers

Handle all the [pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) at once using this hook.

## Parameters

1. a function that handles the pointer events that takes two arguments, the [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) object and a pointer event list.
2. and some options:

| Name        | Type      | Description                                                                                                      |
| ----------- | --------- | ---------------------------------------------------------------------------------------------------------------- |
| **ref**     | RefObject | the target element reference.                                                                                    |
| **capture** | Boolean   | the pointer will be targeted at the capture element until capture is released or removed from the pointers list. |

## Return Values

a `ref` object of the target element.

::: tip
Some browsers has a built-in touch actions, so if you try to use it the browsers will cancel it, you can disable these defaut touch actions using CSS:

```css
...
touch-action: none;
...
```

:::

## Example Usage

```tsx
import { usePointers } from 'react-pre-hooks';

export default function Example() {
  const ref = usePointers((event, list) => {
    let pointer;
    pointer = document.getElementById(event.pointerId + '');

    if (!pointer) {
      pointer = document.createElement('div');
      pointer.id = event.pointerId + '';
      pointer.classList.add('pointer');
    }

    pointer.style.top = event.clientY + 'px';
    pointer.style.left = event.clientX + 'px';

    if (event.type === 'pointerdown') {
      document.body.appendChild(pointer);
    } else if (!list.find(e => e.pointerId === event.pointerId)) {
      pointer.remove();
    }
  });

  return (
    <div ref={ref}>
      <p>Start pointing with your fingers!</p>
    </div>
  );
}
```

<iframe src="https://codesandbox.io/embed/usepointers-3n3jf7?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="usePointers" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
