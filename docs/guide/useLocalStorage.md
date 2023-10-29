# useLocalStorage

Get and Set a specific value in the [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

## Parameters

1. the local storage key.
2. the initial value of the key (default is `null`).

## Return Values

It returns a tuple of 2 values:

| Index | Name         | Type     | Description                      |
| :---: | ------------ | -------- | -------------------------------- |
|   0   | **value**    | Any      | the current local storage value. |
|   1   | **setValue** | Function | update the value.                |

::: info
When you update a value on the local storage, a [StorageEvent](https://developer.mozilla.org/en-US/docs/Web/API/StorageEvent) will be fired on `window`.
:::

## Example Usage

```tsx
import { useLocalStorage } from 'realtime-hooks';

export default function Example() {
  const [name, setName] = useLocalStorage('name', 'unknown');

  return (
    <main>
      <label htmlFor="name">Name:</label>
      <input id="name" value={name} onChange={e => setName(e.target.value)} />
      <p>Current user name: {name}</p>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/uselocalstorage-r9dsgd?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useLocalStorage" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
