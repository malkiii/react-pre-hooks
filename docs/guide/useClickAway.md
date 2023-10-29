# useClickAway

Execute a function when the user clicks outside a target element.

## Parameters

1. a click event callback funtion.
2. and some options:

| Name    | Type      | Description                   |
| ------- | --------- | ----------------------------- |
| **ref** | RefObject | the target element reference. |

## Return Values

a `ref` object of the target element.

::: tip
If you want to **cancel** the click away function, just use [stopPropagation](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation) method of the click event:

```ts
const handleClick = (event) => {
  event.stopPropagation();
  ...
}
```

:::

## Example Usage

```tsx
import { useClickAway } from 'realtime-hooks';

export default function Example() {
  const ref = useClickAway(() => ref.current.classList.add('hide'));

  const showModal = e => {
    e.stopPropagation(); // cancel the click away function
    ref.current.classList.remove('hide');
  };

  return (
    <main>
      <button onClick={showModal}>Open</button>
      <div id="modal" ref={ref} className="hide">
        <strong>Click Outside!</strong>
        <p>to close this modal.</p>
      </div>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/useclickaway-pj956r?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useClickAway " allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
