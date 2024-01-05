# useSelection

This hook returns the current selected text on the window or a specific element, and other things.

## Parameters

- the `ref` object of the target element (default is `document`).

::: warning
**Do not** use `window` as the target element, it will only work with HTML elements.
:::

## Return Values

| Name            | Type      | Description                                                    |
| --------------- | --------- | -------------------------------------------------------------- |
| **ref**         | RefObject | the target element reference.                                  |
| **text**        | String    | the selection text or `null`.                                  |
| **rect**        | Object    | the selection rectangle (`top`, `left`, `width`...).           |
| **isCollapsed** | Boolean   | indicates whether or not there is currently any text selected. |

## Example Usage

<!-- prettier-ignore -->
```tsx
import { useSelection } from 'react-pre-hooks';

export default function Example() {
  const { text, rect, isSelecting } = useSelection();

  return (
    <main>
      {!isSelecting && text && (
        <span style={{ top: rect.top + 'px', left: rect.left + rect.width / 2 }}>
          Quote this!
        </span>
      )}
      <article>
        <h1>Select anything.</h1>
        <p>
          A user may make a selection from left to right (in document order)
          or right to left (reverse of document order). The anchor is where
          the user began the selection and the focus is where the user ends 
          the selection. If you make a selection with a desktop mouse,
          the anchor is placed where you pressed the mouse button, and 
          the focus is placed where you released the mouse button.
        </p>
      </article>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/useselection-5rkkxh?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useSelection" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
