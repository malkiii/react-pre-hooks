# useKeyboard

Bind any keyboard **`keys`** or **`hotkeys`** with handlers in a very simple way.

## Parameters

1. the keys record:

This hook bind the keys using an object format where the keys or hotkeys (separated with a `separator` if you use multiple keys with one handler) as the object keys, and the [`KeyboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) handlers as the values.

```ts
useKeyboard(
  {
    'w': e => {},
    'alt+p': e => {},
    'q | Ctrl+A | alt+shift+d': e => {}
  },
  { ref: document.body }
);
```

or you can specify your own separator:

```ts
useKeyboard(
  {
    'd, alt+f, meta+f': e => {}
  },
  { separator: ',', ref: window }
);
```

:::info
You can use any string case you want for the keys, for example:
`ctrl+f`, `Ctrl + F`, and `ctrl + F` are the same.
:::

2. and some options

| Name          | Type      | Description                                                             |
| ------------- | --------- | ----------------------------------------------------------------------- |
| **ref**       | RefObject | the target element reference.                                           |
| **separator** | String    | the string separator between the keys in one handler (default is `\|`). |

## Return Values

a `ref` object of the target element.

## Example Usage

```tsx
import { useKeyboard } from 'realtime-hooks';

export default function Example() {
  useKeyboard(
    {
      'F': () => console.log('you pressed F'),
      '1|2|3': e => console.log(`you pressed ${e.key}`),
      'Ctrl+x': () => console.log('you pressed Ctrl and X')
    },
    { ref: window }
  );

  return <main>Press any key from the keys above..</main>;
}
```

<iframe src="https://codesandbox.io/embed/usekeyboard-y2p6pv?expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useKeyboard" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
