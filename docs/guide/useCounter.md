# useCounter

Use a simple counter with `min` and `max` values, and some methods to minimalize the component.

## Parameters

1. the initial counter value (default is `0`).
2. and some counter options:

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
import { useCounter } from 'react-pre-hooks';

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

<iframe src="https://codesandbox.io/embed/usecounter-fyvy73?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="useCounter" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
