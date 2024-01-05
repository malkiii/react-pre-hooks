# useSet

This hook returns an set with with some common and useful set methods making the code minimal and maintainable.

## Parameters

- the initial set object (default is `{}`);

## Props And Methods

### `value` and `size`

`value` uses the set itsself, and `size` determines how many values are in it:

```ts
const set = useSet([1, 2, 2, 3]);

set.values; // { 1, 2, 3 }
set.size; // 3
```

### `add()` and `delete()`

Add or delete one or multiple values in the set:

```ts
const set = useSet([0]);

set.add(1);
// set -> { 0, 1 }
set.add(2, 1);
// set -> { 0, 1, 2 }

set.delete(0);
// set -> { 1, 2 }
set.delete(2, 3);
// set -> { 1 }
```

### `has()`

Check if a value is included in the set, if you use multiple values, it will return `true` if and only if all the values are included in the set:

```ts
const set = useSet([-1, 0, 3, 5]);

set.has(5); // true
set.has(0, -1); // true
set.has(3, 4, 5); // false, 4 does not exist.
```

### `find()`

It's similar to the `find` method in the array object which can take a callback function and return the first value that passed to the callback and returns a truthy value, and it takes a specific set as the second argument:

```ts
const set = useSet([
  { id: 1, text: 'hello' },
  { id: 2, text: 'world' }
]);

set.find(value => value.id == 2); // { id: 2, text: 'world' }
set.find(value => text.startsWith('b')); // undefined
```

### `toArray()`

Returns an array of the set values, and it can take the `map` callback function to map the values with it:

```ts
const set = useSet([-1, 0, 1]);

set.toArray(); // [-1, 0, 1]
set.toArray((value, i) => value + i); // [-1, 1, 3]
```

### `clear()`

Clear the entire set:

```ts
const set = useSet(['a', 'b', 'b']);

set.clear();
// set -> {}
```

### `isEqual()`

Check if an set is **deeply equal** to the current set:

```ts
const set = useSet([{ a: 1 }, { b: { c: 0, d: 1 } }]);

set.isEqual(new Set([{ a: 1 }, { b: { d: 3, c: 2 } }])); // true
set.isEqual(new Set([{ a: 1 }, { b: { c: 1, d: 3 } }])); // false
```

### `copy()`

Returns a **deep copy** of the set:

```ts
const set = useSet([{ a: 1 }, { b: 2 }]);

const copy = set.copy();

console.log(set.value === copy); // false
```

### `reset()`

If you don't pass a new set to this method, it will reset the set to its initial value:

```ts
const set = useSet([0]);

set.reset(new Set([1, 2, 1, 2]));
// set -> { 1, 2 }

set.reset(prev => new Set([...prev, 0]));
// set -> { 1, 2, 0 }

set.reset();
// set -> { 0 }
```

## Example Usage

```tsx
import { useSet } from 'react-pre-hooks';

export default function Balls() {
  const set = useSet<number>();

  const addRandomBall = () => {
    set.add(Math.floor(Math.random() * 10));
  };

  return (
    <main>
      <button onClick={addRandomBall}>Add</button>
      <ul>
        {set.toArray((value, i) => (
          <li key={i} onClick={() => set.delete(value)}>
            {value}
          </li>
        ))}
      </ul>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/useset-tkgjpk?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useSet" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
