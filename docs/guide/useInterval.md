# useInterval

This hook makes [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) easy to use and control with some useful methods.

## Options

| Name             | Type    | Description                                                                 |
| ---------------- | ------- | --------------------------------------------------------------------------- |
| **timeout**      | Number  | the `setInterval` timeout in `ms`.                                          |
| **startOnMount** | Boolean | start automatically when the component is **mounted** (default is `false`). |
| **deps**         | Array   | dependency array (default is `[]`)                                          |

## Props And Methods

### `start()`, `stop()`, and `toggle()`

Use these two methods to start and stop the interval, or toggle between them using `toggle`:

```ts
const interval = useInterval(() => console.log('Hello!'), { timeout: 1000 });

interval.start(); // running
interval.stop(); // stopped

interval.toggle(); // running
interval.toggle(); // stopped

interval.toggle(true); // running
interval.toggle(false); // stopped
```

### `isRunning`

this value indicates whether the interval is running or not:

```ts
const interval = useInterval(() => console.log('Running...'), {
  timeout: 500,
  startOnMount: true
});

interval.isRunning; // true

interval.stop();

interval.isRunning; // false
```

## Example Usage

<!-- prettier-ignore -->
```tsx
import { useCounter, useInterval } from 'realtime-hooks';

export default function Counter() {
  const counter = useCounter();

  const interval = useInterval(() => counter.inc(), {
    timeout: 1000,
    startOnMount: true
  });

  return (
    <main>
      <p>{counter.value}</p>
      <button onClick={() => interval.toggle()}>
        {interval.isRunning ? 'Stop' : 'Start'}
      </button>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/useinterval-4gdrn7?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useInterval" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
