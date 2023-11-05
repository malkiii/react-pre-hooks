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
      <div ref={pointerLock.ref} onClick={() => pointerLock.toggle()}>
        Click to {pointerLock.isEnabled ? 'exit' : 'enter'}.
      </div>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usepointerlock-8djzpp?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="usePointerLock" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
