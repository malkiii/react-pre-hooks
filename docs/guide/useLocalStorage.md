# useLocalStorage

Get and Set a specific value in the [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

## Parameters

| Name        | Type   | Description                                       |
| ----------- | ------ | ------------------------------------------------- |
| **key**     | String | the local storage key.                            |
| **initial** | Any    | the initial value of the key (default is `null`). |

## Return Values

It returns a tuple of 2 values:

| Index | Name         | Type     | Description                      |
| :---: | ------------ | -------- | -------------------------------- |
|   0   | **value**    | Any      | the current local storage value. |
|   1   | **setValue** | Function | update the value.                |

## Example Usage

```tsx
import { useLocalStorage } from 'realtime-hooks';

export default function Example() {
  const [name, setName] = useLocalStorage('name', 'unknown');

  return (
    <main>
      <label htmlFor="name">Name:</label>
      <input id="name" type="text" onChange={e => setName(e.target.value)} />
      <div>Current user name: {value}</div>
    </main>
  );
}
```
