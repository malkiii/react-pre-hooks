# useMediaDevices

This hook uses the user media devices (**camera** and **microphone**) and returns their states and controls as well as their stream object.

## Options

- It takes a [getUserMedia constraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#constraints), as well as some other options:

| Name             | Type      | Description                                                                 |
| ---------------- | --------- | --------------------------------------------------------------------------- |
| **ref**          | RefObject | a `<video>` element reference.                                              |
| **startOnMount** | Boolean   | start automatically when the component is **mounted** (default is `false`). |

## Return Values

| Name           | Type      | Description                                                                                                                                                                                                                                                                                                                         |
| -------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ref**        | RefObject | a `<video>` element reference.                                                                                                                                                                                                                                                                                                      |
| **stream**     | RefObject | the [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) object reference that you can use with a **video** element as [`srcObject`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject), or with an [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext). |
| **camera**     | Object    | an object that has an array of the user camera `devices` as well as `isEnabled` that indicates whether the user camera is being used or not.                                                                                                                                                                                        |
| **microphone** | Object    | an object that has an array of the user microphone `devices` as well as `isEnabled` that indicates whether the user microphone is being used or not.                                                                                                                                                                                |
| **start**      | Function  | a function to start streaming, and it can take the user media [constraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#constraints) as a parameter (default is the initial constraints).                                                                                                            |
| **stop**       | Function  | a function to stop streaming.                                                                                                                                                                                                                                                                                                       |

## Example Usage

```tsx
import { useMediaDevices } from 'realtime-hooks';

export default function Example() {
  const { ref, start, stop, camera, microphone } = useMediaDevices({
    video: true,
    audio: true
  });

  return (
    <main>
      <button onClick={() => start()}>Start</button>
      <button onClick={() => stop()}>Stop</button>
      {!camera.isEnabled && <p>You don't have the camera permission!</p>}
      {!microphone.isEnabled && <p>You don't have the microphone permission!</p>}
      <video ref={ref} />
    </main>
  );
}
```
