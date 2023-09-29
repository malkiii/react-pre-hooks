# useSessionStorage

Get and Set a specific value in the [session storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).

## Parameters

| Name        | Type   | Description                                       |
| ----------- | ------ | ------------------------------------------------- |
| **key**     | String | the session storage key.                          |
| **initial** | Any    | the initial value of the key (default is `null`). |

## Return Values

It returns a tuple of 2 values:

| Index | Name         | Type     | Description                        |
| :---: | ------------ | -------- | ---------------------------------- |
|   0   | **value**    | Any      | the current session storage value. |
|   1   | **setValue** | Function | update the value.                  |

## Example Usage

```tsx
import { useSessionStorage } from 'realtime-hooks';

export default function Example() {
  const [counter, setCounter] = useSessionStorage('counter', 0);

  return (
    <main>
      <button onClick={() => setCounter(v => v + 1)}>+</button>
      <span>{counter}</span>
      <button onClick={() => setCounter(v => v - 1)}>-</button>
    </main>
  );
}
```
