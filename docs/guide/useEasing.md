# useEasing

Change a value from a **start** to an **end** value using an [animation timing function](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function).

## Options

| Name             | Type             | Description                                                                 |
| ---------------- | ---------------- | --------------------------------------------------------------------------- |
| **interval**     | [Number, Number] | the [start, end] interval (default is `[0, 1]`).                            |
| **easing**       | Function         | the animation timing function (default is `(x) => x`).                      |
| **duration**     | Number           | the easing duration in `ms` (default is `1000`).                            |
| **startOnMount** | Boolean          | start automatically when the component is **mounted** (default is `false`). |

::: tip
You can find many easing functions on [easings.net](https://easings.net/).
:::

## Props And Methods

### `value`

The eased value that variates between the interval:

```ts
const easing = useEasing({ interval: [0, 500] });

easing.value; // always between 0 and 500
```

### `play()`, `pause()`, and `togglePlayState()`

Play and pause the easing, or toggle between them using `togglePlayState` with a boolean value to play or pause:

```ts
const easing = useEasing({ interval: [10, 999] });

easing.play(); // playing
easing.pause(); // paused

easing.togglePlayState(); // playing
easing.togglePlayState(); // paused

easing.togglePlayState(true); // paused
easing.togglePlayState(false); // paused
```

### `reverse()` and `cancel()`

Use `reverse` to reverse the easing while is playing or paused, or `cancel` to cancel it:

```ts
const easing = useEasing({ startOnMount: true, duration: 1500 });
// now is playing forwards to the end value

easing.reverse();
// now is playing backwards to the start value

easing.cancel();
```

### Easing stats

It also returns the easing stats:

| Name             | Type    | Description                                                     |
| ---------------- | ------- | --------------------------------------------------------------- |
| **`isPlaying`**  | Boolean | the easing is playing.                                          |
| **`isPaused`**   | Boolean | the easing is paused.                                           |
| **`isReversed`** | Boolean | the easing is reversed.                                         |
| **`isFinished`** | Boolean | the easing has reached the end (or the start if it's reversed). |

## Example Usage

we are going to use [easeInOutExpo](https://easings.net/#easeInOutExpo) function:

```ts
function easeInOutExpo(x: number): number {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
}
```

to create an easing animation using this function:

```tsx
import { useEasing } from 'realtime-hooks';

export default function Example() {
  const easing = useEasing({
    interval: [100, 0],
    easing: easeInOutExpo,
    duration: 1500
  });

  return (
    <main>
      <button onClick={() => easing.togglePlayState()}>
        {easing.isPlaying ? 'pause' : 'play'}
      </button>
      <button onClick={() => easing.reverse()}>Reverse</button>
      <div style={{ left: easing.value + 'px' }}></div>
    </main>
  );
}
```
