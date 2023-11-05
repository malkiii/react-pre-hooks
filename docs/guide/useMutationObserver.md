# useMutationObserver

Handles the [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) and tracks changes being made to the DOM tree.

## Parameters

1. the [MutationObserver callback](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/MutationObserver#callback) function.
2. the [MutationObserver options](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe#options), as well as the `ref` object of the target element.

## Return Values

| Name         | Type      | Description                                                                                                                  |
| ------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **ref**      | RefObject | the target element reference.                                                                                                |
| **observer** | RefObject | the [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/MutationObserver) object reference. |

## Example Usage

```tsx
import { useMutationObserver, useSet } from 'realtime-hooks';

export default function Items() {
  const items = useSet<number>();

  const { ref } = useMutationObserver(
    records => {
      records.forEach(record => {
        console.log(`the item ${record.addedNodes[0].textContent} is added.`);
      });
    },
    { childList: true }
  );

  const addItem = () => {
    items.add(Math.floor(Math.random() * 100));
  };

  return (
    <main>
      <div ref={ref}>
        {items.toArray((value, i) => (
          <span key={i}>{value}</span>
        ))}
      </div>
      <button onClick={addItem}>Add element</button>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usemutationobserver-sz3qdq?expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useMutationObserver" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
