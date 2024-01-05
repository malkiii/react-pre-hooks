# useToggle

Toggles a state between an array of values.

## Parameters

- an array of given values to toggle between (default is `[false, true]`).

::: warning
**Do not** include duplicate values in the array, otherwise, it will not work properly.
:::

## Return Values

It returns a tuple of 2 values:

| Index | Name       | Type     | Description                                                                                                   |
| :---: | ---------- | -------- | ------------------------------------------------------------------------------------------------------------- |
|   0   | **value**  | Any      | the current value.                                                                                            |
|   1   | **toggle** | Function | change to the next value using `toggle()`, or to a specific value from the given array using `toggle(value)`. |

## Example Usage

```tsx
import { useToggle } from 'react-pre-hooks';

export default function Example() {
  const [background, toggle] = useToggle(['red', 'green', 'blue', 'white']);

  return (
    <main>
      <div style={{ background }} onClick={() => toggle()}></div>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usetoggle-y4f6rx?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useToggle" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
