# useAnimatePresence

Animate a conditional rendered element when it enters and exits the DOM in a very simple way using the element `ref`, `isMounted` value, and a simple `toggle` function.

## Options

| Name             | Type      | Description                                                                                                                                   |
| ---------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **ref**          | RefObject | the target element reference.                                                                                                                 |
| **initialMount** | Boolean   | if the element is presente in the first render or not.                                                                                        |
| **keyframes**    | Object    | animation keyframes, see [Keyframe Formats](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats).            |
| **transition**   | Object    | animation transition options, see [Keyframe Options](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect#options). |
| **onEnter**      | Function  | a handler that will be executed when the element enters.                                                                                      |
| **onExit**       | Function  | a handler that will be executed when the element exits.                                                                                       |

## Return Values

| Name          | Type      | Description                                                                                                                    |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **ref**       | RefObject | the target element reference.                                                                                                  |
| **isMounted** | Boolean   | Represent if the element is in the DOM or not.                                                                                 |
| **toggle**    | Function  | Toggle between entering and exiting, you can force it by calling `toggle(true)` for entering, and `toggle(false)` for exiting. |

## Example Usage

```tsx
import { useAnimatePresence } from 'realtime-hooks';

export default function Example() {
  const { ref, isMounted, toggle } = useAnimatePresence({
    keyframes: {
      opacity: [0, 1],
      translate: ['0 70px', '0 0']
    },
    transition: {
      easing: 'ease',
      duration: 200
    }
  });

  return (
    <main>
      <button onClick={() => toggle()}>Toggle</button>
      {isMounted && <div ref={ref}>This is a modal!</div>}
    </main>
  );
}
```
