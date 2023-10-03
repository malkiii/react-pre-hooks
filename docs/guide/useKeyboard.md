# useKeyboard

Bind any keyboard **`keys`** or **`hotkeys`** with handlers in a very simple way.

## Keys Record

This hook bind the keys using an object format where the keys or hotkeys (separated with a `separator` if you use multiple keys with one handler) as the object keys, and the [`KeyboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) handlers as the values.

```ts
useKeyboard(
  {
    'w': e => {},
    'alt+p': e => {},
    'q | Ctrl+A | alt+shift+d': e => {}
  },
  { target: document.body }
);
```

or you can specify your own separator:

```ts
useKeyboard(
  {
    'd, alt+f, meta+f': e => {}
  },
  { separator: ',', target: window }
);
```

:::info
You can use any string case you want for the keys, for example:
`ctrl+f`, `Ctrl + F`, and `ctrl + F` are the same.
:::

## Options

| Name           | Type   | Description                                                                                                   |
| -------------- | ------ | ------------------------------------------------------------------------------------------------------------- |
| **separator**  | String | the string separator between the keys in one handler (default is `\|`).                                       |
| **...options** | Object | the event listener [options](./useEventListener.md#parameters), and the target element (default is `window`). |

## Return Values

a `ref` object of the target element.

## Example Usage

```tsx
import { useKeyboard } from 'realtime-hooks';

export default function Example() {
  useKeyboard(
    {
      'F': () => console.log('you pressed F');
      '1|2|3': (e) => console.log(`you pressed ${e.key}`);
      'Ctrl+s': () => console.log('you pressed Ctrl and S');
    },
    { target: window }
  );

  return <main></main>;
}
```
