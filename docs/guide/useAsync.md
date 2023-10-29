# useAsync

This hook simplifies the execution of an `async` function by returning its states and results.

## Parameters

1. an [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) (a function that returns a promise).
2. the dependency array (default is `[]`)

## Return Values

| Name          | Type                   | Description                         |
| ------------- | ---------------------- | ----------------------------------- |
| **data**      | `callback` return type | resolved data from the function.    |
| **isPending** | Boolean                | the loading state.                  |
| **retry**     | Fnuction               | retry executing the async function. |
| **error**     | Unknown                | cached error if it exists.          |

## Example Usage

```tsx
import { useAsync } from 'realtime-hooks';

const getData = (ms: number) => {
  return new Promise<string>(res => setTimeout(() => res('Resolved!'), ms));
};

export default function Example() {
  const { data, isPending, retry } = useAsync(async () => {
    return await getData(2200);
  });

  return (
    <main>
      <div>{isPending ? 'Loading...' : data}</div>
      <button onClick={retry}>Retry</button>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/useasync-wxrnql?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useAsync" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
