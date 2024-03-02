# useBoolean

A hook that toggles between `true` and `false`.

## Parameters

- an initial value (default is `false`).

## Return Values

It returns a tuple of 2 values:

| Index | Name       | Type     | Description                    |
| :---: | ---------- | -------- | ------------------------------ |
|   0   | **value**  | Boolean  | the current value.             |
|   1   | **toggle** | Function | toggle between true and false. |

## Example Usage

```tsx
import { useBoolean } from 'react-pre-hooks';

export default function Example() {
  const [value, toggle] = useBoolean();

  return (
    <main>
      <button onClick={() => toggle()}>{value ? 'On' : 'Off'}</button>
    </main>
  );
}
```
