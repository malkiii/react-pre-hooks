# useArray

This hook returns an array with with some common and useful array methods making the code minimal and maintainable.

## Props And Methods

### `values` and `length`

`values` uses the array itsself:

```ts
const array = useArray([1, 2, 3]);

const nums = array.values; // [1, 2, 3]
const len = array.length; // 3
```

### `get()` and `set()`

Get or Set a value from the array using its index, and both work with negative values:

```ts
const array = useArray(['a', 'c', 'f']);

const first = array.get(0); // 'a'
const last = array.get(-1); // 'f'

array.set(0, 'b');
// values -> ['b', 'c', 'f']

array.set(-2, 'd');
// values -> ['b', 'd', 'f']
```

### `has()`

Check if a value is included in the array, if you use multiple values, it will return `true` if and only if all the values are included in the array:

```ts
const array = useArray([-1, 0, 3, 5]);

array.has(5); // true
array.has(0, -1); // true
array.has(3, 4, 5); // false, 4 does not exist.
```

### `isEqual()`

Check if an array is **deeply equal** to the current array:

```ts
const array = useArray([{ a: 1 }, { b: { c: 0, d: 1 } }]);

array.isEqual([{ a: 1 }, { b: { d: 3, c: 2 } }]); // true
array.isEqual([{ a: 1 }, { b: { c: 1, d: 3 } }]); // false, c has the value 1 not 2
```

### `count()`

Count the occurrences of a value in the array using a target value or a handler:

```ts
const array = useArray(['b', 'a', 'b', 'd']);

array.count('b'); // 2
array.count('c'); // 0
array.count(value => value === 'a' || value === 'b'); // 3
```

### `push()` and `pop()`

`push` appends a value or **multiple** values to the array, and `pop` removes a value using its index and **return it**, it works also with negative values:

```ts
const array = useArray([1, 2, 3]);

array.push(4, 5, 6);
// values -> [1, 2, 3, 4, 5, 6]

const second = array.pop(1); // 2
// values -> [1, 3, 4, 5, 6]

const last = array.pop(-1); // 6
// values -> [1, 3, 4, 5]
```

### `shift()` and `unshift()`

`shift` removes the first value and **return it**, and `unshift` adds a value or **multiple** values in the beggining of the array:

```ts
const array = useArray([0, 3, 4, 5]);

const first = array.shift(); // 0
// values -> [3, 4, 5]

array.unshift(1, 2);
// values -> [1, 2, 3, 4, 5]
```

### `insert()` and `remove()`

`insert` add one or **multiple** values in a specific index, and `remove` removes one or **multiple** values from the array:

```ts
const array = useArray(['a', 'e']);

array.insert(-1, 'b', 'c', 'd');
// values -> ['a', 'b', 'c', 'd', 'e']

array.insert(5, 'f');
// values -> ['a', 'b', 'c', 'd', 'e', 'f']

array.remove('e', 'f', 'g');
// values -> ['a', 'b', 'c', 'd']
```

### `apply()`

Update all the values using a callback function:

```ts
const array = useArray([-1, 0, 1, 2]);

array.apply(value => value * 2);
// values -> [-2, 0, 2, 4]
```

### `copy()`

Returns a **deep copy** of the array:

```ts
const array = useArray([{ a: 1 }, { b: 2 }]);

const copy = array.copy();

console.log(array.values === copy); // false
```

### `reset()`

If you don't pass a new array to this method, it will reset the array to its initial value:

```ts
const array = useArray([0]);

array.reset([1, 2, 3, 4, 5]);
// values -> [0, 1, 2, 3, 4, 5]

array.reset(prev => prev.filter(value => value % 2 === 0));
// values -> [2, 4]

array.reset();
// values -> [0]
```

## Example Usage

```tsx
import { useArray } from 'realtime-hooks';

export default function ToDoList() {
  const array = useArray(['apple', 'dolphin', 'giraffe', 'iguana']);

  const addItem = () => {
    const value = document.querySelector('input').value;
    if (value) array.push(value);
  };

  return (
    <main>
      <input type="text" />
      <button onClick={addItem}>Add</button>
      <ul>
        {array.values.map((value, i) => (
          <li key={i}>
            <span>{value}</span>
            <button onClick={() => array.pop(i)}>Remove</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
```
