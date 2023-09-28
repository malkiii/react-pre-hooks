# useTimeout

This hook makes [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) easy to use and control with some useful methods.

## Options

| Name             | Type    | Description                                                                 |
| ---------------- | ------- | --------------------------------------------------------------------------- |
| **timeout**      | Number  | the `setTimeout` timeout in `ms`.                                           |
| **startOnMount** | Boolean | start automatically when the component is **mounted** (default is `false`). |
| **deps**         | Array   | dependency array (default is `[]`)                                          |

## Props And Methods

### `start()`, `cancel()`, and `toggle()`

Use these two methods to start and cancel the timeout, or toggle between them using `toggle`:

```ts
const timeout = useTimeout(() => console.log('Hello!'), { timeout: 1000 });

timeout.start(); // running
timeout.cancel(); // canceled

timeout.toggle(); // running
timeout.toggle(); // canceled

timeout.toggle(true); // running
timeout.toggle(false); // canceled
```

### `isRunning`

this value indicates whether the timeout is running or not:

```ts
const timeout = useTimeout(() => console.log('Stoped by setTimeout.'), {
  timeout: 500,
  startOnMount: true
});

timeout.isRunning; // true

timeout.cancel();

timeout.isRunning; // false
```

## Example Usage

<!-- prettier-ignore -->
```tsx
import { useTimeout } from 'realtime-hooks';

export default function Hello() {
  const timeout = useTimeout(() => console.log('done!'), {
    timeout: 1000,
    startOnMount: true
  });

  return (
    <main>
      <button onClick={() => timeout.toggle()}>
        {timeout.isRunning ? 'Cancel' : 'Start'}
      </button>
      <div>{timeout.isRunning ? 'Wait...': 'Hello!'}</div>
    </main>
  );
}
```
