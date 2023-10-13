# useScrollEnd

Execute a callback when the scrolling is close to the end with a specific `offset`.

## Options

| Name           | Type      | Description                                                     |
| -------------- | --------- | --------------------------------------------------------------- |
| **ref**        | RefObject | the target element reference (default is `window`).             |
| **offset**     | Number    | the distance before reaching the scroll end (default is `5`px). |
| **horizontal** | Boolean   | use horizontal scrolling (default is `false`).                  |

## Return Values

a `ref` object of the target element.

## Example Usage

```tsx
import { useScrollEnd } from 'realtime-hooks';

export default function Example() {
  useScrollEnd(() => console.log('Hey!'), { offset: 200 });

  return <main></main>;
}
```
