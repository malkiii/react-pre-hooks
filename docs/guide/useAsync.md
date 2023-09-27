# useAsync

This hook simplifies the execution of an `async` function by returning its states and results.

## Options

| Name         | Type     | Description                                                                                                                                           |
| ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **callback** | Function | the [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) (a function that returns a promise) |
| **deps**     | Array    | dependency array (default is `[]`)                                                                                                                    |

## Return Values

| Name          | Type                   | Description                         |
| ------------- | ---------------------- | ----------------------------------- |
| **data**      | `callback` return type | resolved data from the function.    |
| **isLoading** | Boolean                | the loading state.                  |
| **retry**     | Fnuction               | retry executing the async function. |
| **error**     | Unknown                | cached error if it exists.          |

## Example Usage

```tsx
import { useAsync } from 'realtime-hooks';

const getData = (ms: number) => {
  return new Promise(res => setTimeout(() => res(`Resolved after ${ms}ms`), ms));
};

export default function Example() {
  const { data, isLoading, retry } = useAsync(async () => {
    return await getData(2200);
  });

  return (
    <main>
      <div>{isLoading ? 'Loading...' : data}</div>
      <button onClick={retry}>Retry</button>
    </main>
  );
}
```
