# useMediaDevices

This hook uses the user media devices (**camera** and **microphone**) and returns their states and controls as well as their stream object.

## Options

- It takes a [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#constraints) constraints, as well as some other options:

| Name             | Type      | Description                                                                 |
| ---------------- | --------- | --------------------------------------------------------------------------- |
| **ref**          | RefObject | a `<video>` element reference.                                              |
| **startOnMount** | Boolean   | start automatically when the component is **mounted** (default is `false`). |

## Return Values

| Name           | Type      | Description                                                                                                                                                                                                                                                                                                                         |
| -------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ref**        | RefObject | a `<video>` element reference.                                                                                                                                                                                                                                                                                                      |
| **stream**     | RefObject | the [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) object reference that you can use with a **video** element as [`srcObject`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject), or with an [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext). |
| **camera**     | Object    | a [MediaDeviceState](#media-object) object that has an array of the user camera `devices` as well as his `current` device...                                                                                                                                                                                                        |
| **microphone** | Object    | a [MediaDeviceState](#media-object) object that has an array of the user microphone `devices` as well as his `current` device...                                                                                                                                                                                                    |
| **isStarted**  | Boolean   | indicates if the user media requesting is started or not.                                                                                                                                                                                                                                                                           |
| **error**      | Unknown   | cached error if it exists.                                                                                                                                                                                                                                                                                                          |
| **start**      | Function  | a function to start streaming.                                                                                                                                                                                                                                                                                                      |
| **stop**       | Function  | a function to stop streaming.                                                                                                                                                                                                                                                                                                       |

### `MediaDeviceState` Object

| Name              | Type     | Description                                                                                                                                          |
| ----------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **devices**       | Array    | an array of [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) objects that represent the user's available devices. |
| **current**       | Object   | the current [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) object, which is the user's current device.          |
| **isEnabled**     | Boolean  | indicates if the current device is enabled (**unmuted** in case of `audio`).                                                                         |
| **hasPermission** | Boolean  | indicates if it has the user permission.                                                                                                             |
| **set**           | Function | set a specific device from the array of `devices`.                                                                                                   |
| **enable**        | Function | enable the current device (**unmute** in case of `audio`), this function can also take a **boolean** to force it to be enabled or disabled.          |

## Example Usage

```tsx
import { useMediaDevices } from 'realtime-hooks';

export default function Example() {
  const { ref, camera, microphone } = useMediaDevices({
    video: true,
    audio: true
  });

  const selectVocie = e => {
    const index = e.currentTarget.selectedIndex;
    camera.set(camera.devices.at(index));
  };

  return (
    <main>
      <select onChange={selectVocie}>
        {camera.devices.map(d => (
          <option key={d.deviceId}>{d.label}</option>
        ))}
      </select>
      {!camera.hasPermission && <p>camera permission denied!</p>}
      {!microphone.hasPermission && <p>microphone permission denied!</p>}
      <video ref={ref} />
    </main>
  );
}
```
