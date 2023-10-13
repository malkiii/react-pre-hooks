# useMutation

Handles the [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) and tracks changes being made to the DOM tree.

## Parameters

| Name        | Type     | Description                                                                                                                                                         |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **handler** | Function | the `MutationObserver` [handler](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/MutationObserver#callback).                                      |
| **options** | Object   | the `ref` object of the target element and the other [MutationObserver options](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe#options). |

## Return Values

a `ref` object of the target element.

## Example Usage

```tsx
import { useArray, useMutation } from 'realtime-hooks';

export default function Items() {
  const items = useArray<number>();

  const ref = useMutation(
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
