# useAnimationFrame

Handle the [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) method of the `window` object.

## Parameters

1. a [frame request callback](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame#parameters) function.
2. and some options:

| Name             | Type    | Description                                                                 |
| ---------------- | ------- | --------------------------------------------------------------------------- |
| **startOnMount** | Boolean | start automatically when the component is **mounted** (default is `false`). |

## Return Values

| Name          | Type     | Description                                                            |
| ------------- | -------- | ---------------------------------------------------------------------- |
| **isStarted** | Boolean  | indicates whether the animation frame request is starting or not.      |
| **start**     | Function | start requesting.                                                      |
| **cancel**    | Function | cancel requesting.                                                     |
| **toggle**    | Function | toggle between start and cancel, and it takes a `boolean` to force it. |

## Example Usage

<!-- prettier-ignore -->
```tsx
import { useAnimationFrame } from 'realtime-hooks';

export default function Example() {
  const frame = useAnimationFrame(() => {
    document.body.appendChild(document.createElement('span'));
  });

  return (
    <main>
      <button onClick={() => frame.toggle()}>
        {frame.isStarted ? 'cancel' : 'start'}
      </button>
    </main>
  );
}
```
