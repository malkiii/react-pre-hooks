# usePointerLock

Toggle the [pointer lock](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API) mode on a target element using this hook.

## Parameters

- a `ref` object of the target element.

## Return Values

| Name          | Type      | Description                                                                                                                                                   |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ref**       | RefObject | the target element reference.                                                                                                                                 |
| **isEnabled** | Boolean   | indicates whether the pointerlock mode is enabled on the target element or not.                                                                               |
| **isError**   | Unknown   | indicates whether is there an error or not.                                                                                                                   |
| **enter**     | Function  | enter to pointer lock mode, and it can take some pointer lock [options](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestPointerLock#options). |
| **exit**      | Function  | exit from the pointer lock mode .                                                                                                                             |
| **toggle**    | Function  | toggle between enter and exit, and it can take a `boolean` to force it.                                                                                       |

## Example Usage

```tsx
import { usePointerLock } from 'realtime-hooks';

export default function Example() {
  const pointerLock = usePointerLock();

  return (
    <main>
      <div onClick={() => pointerLock.toggle()}>
        {pointerLock.isEnabled ? 'Press "Esc" to exit.' : 'Click to enter.'}
      </div>
    </main>
  );
}
```
