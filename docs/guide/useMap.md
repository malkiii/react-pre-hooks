# useMap

This hook returns an object with with some common and useful map methods making the code minimal and maintainable.

## Props And Methods

### `value` and `size`

`value` uses the object itsself, and `size` determines how many keys are in it:

```ts
const map = useMap({ a: 1, b: 2 });

map.value; // { a: 1, b: 2 }
map.size; // 2
```

### `get()` and `set()`

Get or Set a properties from the map:

```ts
const map = useMap({ id: 123, name: 'hello' });

map.get('id'); // 123
map.get('name'); // hello

map.set('id', 456);
// id -> 456

map.set('name', 'world');
// name -> world
```

### `delete()`

Delete one or multiple properties:

```ts
const map = useMap({ id: 5, name: 'john', age: 30 });

map.delete('age', 'name');
// map -> { id: 5 }
```

### `has()`

Check if a property is included in the map, if you use multiple properties, it will return `true` if and only if all the properties are included in the map:

```ts
const map = useMap({ key1: 1, key2: 2, key3: 3 });

map.has('key2'); // true
map.has('key1', 'key3'); // true
map.has('key2', 'key3', 'key4'); // false
```

### `keys()`, `values()`, and `entries()`

`keys` returns an array of the keys, `values` returns an array of the values, and `entries` returns an array of key-value pairs:

```ts
const map = useMap({ id: 1, name: 'world', age: 0 });

map.keys(); // ['id', 'name', 'age']
map.values(); // [1, 'world', 0]
map.entries(); // [['id', 1], ['name', 'world'], ['age', 0]]
```

### `isEqual()`

Check if an map is **deeply equal** to the current map:

```ts
const map = useMap({ a: 1, b: { c: 0, d: 1 } });

map.isEqual({ a: 1, b: { d: 3, c: 2 } }); // true
map.isEqual({ a: 1, b: { c: 1, d: 3 } }); // false, c has the value 1 not 2
```

### `copy()`

Returns a **deep copy** of the map:

```ts
const map = useMap({ a: 1, b: 2 });

const copy = map.copy();

console.log(map.value === copy); // false
```

### `reset()`

If you don't pass a new object to this method, it will reset the map to its initial value:

```ts
const map = useMap<Record<string, any>>({ value: 'something' });

map.reset({ id: 10 });
// map -> { id: 10 }

map.reset(prev => ({ ...prev, name: 'any' }));
// map -> { id: 10, name: 'any' }

map.reset();
// map -> { value: 'something' }
```

### `toJSON()`

This method returns a JSON string of the map, it can also take a number of `spaces` to indent with:

```ts
const map = useMap({ id: 10 });

map.toString({ id: 10 }); // '{"id":10}'

map.toString({ id: 10 }, 2);
/*
{
  "id": 10
}
*/
```

## Example Usage

```tsx
import { useMap } from 'realtime-hooks';

export default function Form() {
  const form = useMap({ email: '', password: '' });

  return (
    <main>
      <form onSubmit={() => alert(form.toJSON(2))}>
        <input type="email" onChange={e => form.set('email', e.target.value)} />
        <input type="password" onChange={e => form.set('password', e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
```
