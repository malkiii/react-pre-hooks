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
import { useArray, useMutationObserver } from 'realtime-hooks';

export default function Items() {
  const items = useArray<number>();

  const ref = useMutationObserver(
    records => {
      records.forEach(record => {
        console.log(`the item ${record.addedNodes[0].textContent} is added.`);
      });
    },
    { childList: true }
  );

  const addItem = () => {
    items.push(Math.floor(Math.random() * 100));
  };

  return (
    <main>
      <button onClick={addItem}>Add</button>
      <div ref={ref}>
        {items.values.map((value, i) => (
          <p>{value}</p>
        ))}
      </div>
    </main>
  );
}
```
