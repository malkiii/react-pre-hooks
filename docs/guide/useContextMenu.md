# useContextMenu

Handle the user right clicks on a target element with this hook.

## Parameters

- the `ref` object of the target element (default is `window`).

## Return Values

| Name        | Type      | Description                                                                                          |
| ----------- | --------- | ---------------------------------------------------------------------------------------------------- |
| **ref**     | RefObject | the target element reference.                                                                        |
| **clientX** | Number    | the `x` position of the mouse.                                                                       |
| **clientY** | Number    | the `y` position of the mouse.                                                                       |
| **canShow** | Boolean   | determins whether you should show or hide the menu.                                                  |
| **toggle**  | Function  | toggle between show and hide. you can force it using a boolean as the parameter like `toggle(true)`. |

::: tip
If you want to **cancel** the context menu, just use [stopPropagation](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation) method of the mouse event:

```ts
const handleRightClick = (event) => {
  event.stopPropagation();
  ...
}
```

:::

## Example Usage

```tsx
import { useContextMenu } from 'react-pre-hooks';

export default function Example() {
  const { ref, canShow, clientX, clientY } = useContextMenu();

  return (
    <div ref={ref}>
      {canShow && (
        <ul style={{ left: clientX, top: clientY }}>
          <li>Item 1.</li>
          <li>Item 2.</li>
          <li>Item 3.</li>
        </ul>
      )}
      <p>right click anywhere!</p>
    </div>
  );
}
```

<iframe src="https://codesandbox.io/embed/usecontextmenu-j4x5mj?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useContextMenu" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
