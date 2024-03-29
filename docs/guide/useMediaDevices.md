# useMediaDevices

This hook uses the user media devices (**camera** and **microphone**) and returns their states and controls as well as their stream object.

## Options

- It takes a [getUserMedia constraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#constraints), as well as some other options:

| Name             | Type      | Description                                                                 |
| ---------------- | --------- | --------------------------------------------------------------------------- |
| **ref**          | RefObject | a `<video>` element reference.                                              |
| **startOnMount** | Boolean   | start automatically when the component is **mounted** (default is `false`). |

## Return Values

| Name        | Type      | Description                                                                                                                                                                                                                                                                                                                         |
| ----------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ref**     | RefObject | a `<video>` element reference.                                                                                                                                                                                                                                                                                                      |
| **stream**  | RefObject | the [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) object reference that you can use with a **video** element as [`srcObject`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject), or with an [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext). |
| **devices** | Array     | an array of the user's media devices.                                                                                                                                                                                                                                                                                               |
| **start**   | Function  | a function to start streaming, and it can take the user media [constraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#constraints) as a parameter (default is the initial constraints).                                                                                                            |
| **stop**    | Function  | a function to stop streaming.                                                                                                                                                                                                                                                                                                       |

## Example Usage

```tsx
import { useMediaDevices } from 'react-pre-hooks';

export default function Example() {
  const { ref, start, stop } = useMediaDevices({ video: true, audio: true });

  return (
    <main>
      <video ref={ref} />
      <button onClick={() => start()}>Start</button>
      <button onClick={() => stop()}>Stop</button>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usemediadevices-sytrrl?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useMediaDevices" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
