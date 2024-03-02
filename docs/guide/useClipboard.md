# useClipboard

Copy to the clipboard and return a temporary `copied` state.

## Options

| Name        | Type   | Description                                             |
| ----------- | ------ | ------------------------------------------------------- |
| **timeout** | Number | the `copied` state duration in `ms` (default is `3000`) |

## Return Values

| Name         | Type     | Description                                                                                                   |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------- |
| **copy**     | Function | copy a the given text.                                                                                        |
| **past**     | Function | returns the copied text from the user clipboard (require **clipboard permission**).                           |
| **isCopied** | Boolean  | a value that stays `true` for a specific duration.                                                            |
| **reset**    | Function | cancel the `copied` state.                                                                                    |
| **error**    | Unknown  | cached clipboard [exception](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/readText#exceptions). |

## Example Usage

```tsx
import { useCopiedState } from 'react-pre-hooks';

export default function Example() {
  const { copy, isCopied, reset } = useCopiedState({ duration: 2000 });

  const text = 'a text to copy!';

  return (
    <main>
      <div onClick={reset}>{text}</div>
      <button onClick={() => copy(text)}>{isCopied ? 'copied' : 'copy'}</button>
    </main>
  );
}
```
