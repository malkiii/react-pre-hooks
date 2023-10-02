# useStateHistory

This hook stores a specific number of the previous state values and uses a **pointer** to switch between them.

## Options

| Name      | Type   | Description                                                                |
| --------- | ------ | -------------------------------------------------------------------------- |
| **limit** | Number | the number of the previous values that should be stored (default is `10`). |

## Return Values

It returns a tuple of 3 values:

| Index | Name         | Type     | Description                                                                              |
| :---: | ------------ | -------- | ---------------------------------------------------------------------------------------- |
|   0   | **value**    | Any      | the current value.                                                                       |
|   1   | **setValue** | Function | updates the value.                                                                       |
|   2   | **pointer**  | Object   | the state history [pointer](#pointer-props-and-methods) that has some props and methods. |

## Pointer Props And Methods

### `history` and `position`

`history` is an array of the previous values, and `position` is the **index** of the current value:

```ts
const [value, setValue, pointer] = useStateHistory(1);

pointer.history; // [1]
pointer.position; // 0

setValue(2);
setValue(3);
setValue(4);

pointer.history; // [1, 2, 3, 4]
pointer.position; // 3
```

### `next()`, `prev()`, and `go()`

go to the next or previous value, or jump by a `step` value with `go`:

```ts
const [value, setValue, pointer] = useStateHistory(1);

setValue(2);
setValue(3);
setValue(4);

value; // 4
pointer.position; // 3

pointer.prev();
value; // 3
pointer.position; // 2

pointer.prev();
value; // 2
pointer.position; // 1

pointer.next();
value; // 3
pointer.position; // 2

pointer.go(-2);
value; // 1
pointer.position; // 0

pointer.go(5);
value; // 4
pointer.position; // 3
```

### `reset()`

reset the pointer to the current value:

```ts
const [value, setValue, pointer] = useStateHistory(1);

setValue(2);
setValue(3);
setValue(4);

pointer.go(-2);

pointer.reset();
value; // 4
pointer.position; // 3
```

### `clear()`

clear the pointer history:

```ts
const [value, setValue, pointer] = useStateHistory(1);

setValue(2);
setValue(3);
setValue(4);

pointer.history; // [1, 2, 3, 4]
pointer.position; // 3

pointer.clear();

pointer.history; // [4]
pointer.position; // 0
```

## Example Usage

```tsx
import { useStateHistory } from 'realtime-hooks';

export default function Counter() {
  const [counter, setCounter, pointer] = useStateHistory(0, { limit: 5 });

  return (
    <main>
      <button onClick={() => setCounter(c => c + 1)}>Increment</button>
      <span>{counter}</span>
      <p>previous values: {pointer.history.join(', ')}</p>
    </main>
  );
}
```
