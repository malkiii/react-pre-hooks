# useTimer

You can create a **timer** or a **countdown** with many options using this hook.

## Options

| Name             | Type    | Description                                                                                                                                                                                                          |
| ---------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **start**        | Object  | initial date value that can be a string or [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date), or it can be a an object with `seconds`, `minutes`, `hours`... values |
| **duration**     | Number  | the duration of the timer (if you'r using the timer mode).                                                                                                                                                           |
| **timeout**      | Number  | the time between the current and the next date value (default is `1000` which is 1 second).                                                                                                                          |
| **startOnMount** | Boolean | start the clock or timer when the component is **mounted** (default is `true`).                                                                                                                                      |

::: tip
If you use a negative value with `duration`, the timer will **count down**.
:::

## Props And Methods

### `value`

the timer value which is a date value:

```ts
const clock = useTimer();

const now = clock.value;
// now -> 2023-09-24T20:20:26.540Z  for example.
```

### `isRunning` and `passing`

`isRunning` indicates whether the timer is running or paused, and `passing` represents the passing time in `ms`:

```ts
const timer = useTimer({ duration: 50, startOnMount: true });

if (timer.isRunning) console.log('running...');
// Console: running...

// after 20 seconds
timer.passing; // 20000
```

### `start()` and `stop()`

you can start and stop the clock whenever you want:

```ts
const timer = useTimer({ startOnMount: false });

timer.isRunning; // false

timer.start();
timer.isRunning; // true

timer.stop();
timer.isRunning; // false
```

### `reset()`

If you don't specify a reset value, it will reset the timer to its initial value:

```ts
const timer = useTimer({ minutes: 1, seconds: 45 });
// timer -> 01:45

timer.reset({ minutes: 5, seconds: 0 });
// timer -> 05:00

timer.reset();
// timer -> 01:45
```

## Example Usage

### 1. Create a timer

<!-- prettier-ignore -->
```tsx
import { useTimer } from 'react-pre-hooks';

export default function Timer() {
  const timer = useTimer({
    initial: { minutes: 1, seconds: 30 },
    duration: -30 * 1000, // 30s countdown
    startOnMount: false
  });

  const min = timer.value.getMinutes().toString().padStart(2, "0");
  const sec = timer.value.getSeconds().toString().padStart(2, "0");

  return (
    <main>
      <p>{min}:{sec}</p>
      <button onClick={() => (timer.isRunning ? timer.stop() : timer.start())}>
        {timer.isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={() => timer.reset()}>
        reset
      </button>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usetimer-xswfn2?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useTimer" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>

### 2. Create a countdown

```tsx
import { useTimer } from 'react-pre-hooks';

export default function Countdown() {
  const duration = 100 * 1000; // 100s
  const countdown = useTimer({ duration });

  return (
    <main>
      <p>{(duration - countdown.passing) / 1000}</p>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usetimer-2-g6hjlx?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useTimer-2" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
