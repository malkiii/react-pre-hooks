# useClipboard

Copy to clipboard and return a temporary `copied` state for tooltips.

## Options

| Name        | Type   | Description                                             |
| ----------- | ------ | ------------------------------------------------------- |
| **timeout** | Number | the `copied` state duration in `ms` (default is `3000`) |

## Return Values

| Name         | Type     | Description                                        |
| ------------ | -------- | -------------------------------------------------- |
| **copy**     | Function | copy a the given text.                             |
| **isCopied** | Boolean  | a value that stays `true` for a specific duration. |
| **reset**    | Function | cancel the `copied` state.                         |
| **error**    | Error    | cached error on copy.                              |

## Example Usage

```tsx
import { useClipboard } from 'realtime-hooks';

export default function Example() {
  const { copy, isCopied, reset } = useClipboard({ duration: 2000 });

  const text = 'a text to copy!';

  return (
    <main>
      <div onClick={reset}>{text}</div>
      <button onClick={() => copy(text)}>{isCopied ? 'copied' : 'copy'}</button>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/useclipboard-r7d4rs?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useClipboard" allow="clipboard-write; accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
