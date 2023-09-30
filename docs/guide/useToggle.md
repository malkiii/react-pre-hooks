# useToggle

Toggles a state between an array of values.

## Parameters

an **array** of any values to toggle between (default is `[false, true]`).

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
import { useToggle } from 'realtime-hooks';

export default function Example() {
  const [background, toggle] = useToggle(['red', 'green', 'blue', 'white']);

  return (
    <main>
      <div style={{ background }} onClick={() => toggle()}></div>
    </main>
  );
}
```
