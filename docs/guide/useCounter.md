# useCounter

Use a simple counter with `min` and `max` values, and some methods to minimalize the component.

## Options

| Name    | Type   | Description    |
| ------- | ------ | -------------- |
| **min** | Number | minmum value.  |
| **max** | Number | maximum value. |

## Props And Methods

### `value`

The current value of the counter:

```ts
const counter = useCounter(2);

const n = counter.value; // 2
```

### `inc()` and `dec()`

Increment and decrement the counter with a `step` value (default is `1`):

```ts
const counter = useCounter(1);

counter.inc();
// value -> 2
counter.inc(5);
// value -> 7

counter.dec();
// value -> 6
counter.dec(4);
// value -> 2
```

### `set()` and `reset()`

`set` changes the counter value, and `reset` reset the counter to its initial value:

```ts
const counter = useCounter(5);

counter.set(10);
// value -> 10
counter.set(v => v + 3);
// value -> 13

counter.reset();
// value -> 5
```

## Example Usage

```tsx
import { useCounter } from 'realtime-hooks';

export default function Example() {
  const counter = useCounter(1, { min: 1, max: 20 });

  return (
    <main>
      <div>
        <button onClick={() => counter.inc()}>+</button>
        <span>{counter.value}</span>
        <button onClick={() => counter.dec()}>-</button>
      </div>
      <button onClick={() => counter.reset()}>Reset</button>
    </main>
  );
}
```
