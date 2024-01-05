# useDebouncedState

This hook returns a state that Updates its value after a specific delay to handle fast updated values.

## Parameters

1. the initial state value.
2. and the debouce options:

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

::: tip
You can also get a debounced value from an **external** state by setting it as the initial value:

```ts
...
const [value, setValue] = useState('anything');
const [debounced] = useDebouncedState(value, { delay: 500 });
...
```

:::

## Example Usage

```tsx
import { useDebouncedState } from 'react-pre-hooks';

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

<iframe src="https://codesandbox.io/embed/usedebouncedstate-n5zqpm?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useDebouncedState" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
