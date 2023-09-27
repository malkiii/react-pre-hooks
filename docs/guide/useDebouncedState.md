# useDebouncedState

This hook returns a state that Updates its value after a specific delay to handle fast updated values.

## Options

| Name      | Type   | Description                                                        |
| --------- | ------ | ------------------------------------------------------------------ |
| **delay** | Number | the duration before updating the state in `ms` (default is `500`). |

## Return Values

It returns a tuple of 3 values:

| Index | Name               | Type     | Description                               |
| :---: | ------------------ | -------- | ----------------------------------------- |
|   0   | **debouncedValue** | Any      | the current debounced value.              |
|   1   | **setValue**       | Function | updates the value.                        |
|   2   | **value**          | Any      | the actual current value (not debounced). |

## Example Usage

```tsx
import { useDebouncedState } from 'realtime-hooks';

export default function Example() {
  const [debounced, setText, current] = useDebouncedState('Hello', { delay: 400 });

  return (
    <main>
      <input type="text" value={current} onChange={e => setText(e.target.value)} />
      <div>Current text: {current}</div>
      <div>Debounced text: {debounced}</div>
    </main>
  );
}
```
