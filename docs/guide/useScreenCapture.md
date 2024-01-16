# useScreenCapture

This hook uses the user **screen capture** and returns its states and controls as well as the media stream object.

## Options

- It takes a [getDisplayMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#constraints) constraints, as well as a video element `ref` object.

## Return Values

| Name          | Type      | Description                                                                                       |
| ------------- | --------- | ------------------------------------------------------------------------------------------------- |
| **ref**       | RefObject | a `<video>` element reference.                                                                    |
| **stream**    | RefObject | the [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) object reference. |
| **isEnabled** | Boolean   | indicates if the screen capture is enabled or not.                                                |
| **error**     | Unknown   | cached error if it exists.                                                                        |
| **start**     | Function  | an async function to start streaming.                                                             |
| **stop**      | Function  | a function to stop streaming.                                                                     |
| **toggle**    | Function  | toggle between start and stop, and it can take a `boolean` to force it.                           |

## Example Usage

<!-- prettier-ignore -->
```tsx
import { useScreenCapture } from 'react-pre-hooks';

export default function Example() {
  const capture = useScreenCapture();

  return (
    <main>
      <button onClick={capture.toggle}>
        {capture.isEnabled ? 'stop' : 'start'}
      </button>
      <video ref={capture.ref} />
    </main>
  );
}
```
