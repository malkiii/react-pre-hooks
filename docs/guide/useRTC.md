# useRTC

This hook uses the user media devices (**camera** and **microphone**) and **screen capture** and returns their states and controls as well as their stream object.

## Options

| Name          | Type              | Description                                                                                                                                                                                                                                          |
| ------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **video**     | Boolean or Object | a boolean that indicates whether it uses the video tracks or not, or a [MediaTrackConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints) object that represents the video's capabilities and values (default `false`). |
| **audio**     | Boolean or Object | a boolean that indicates whether it uses the audio tracks or not, or a [MediaTrackConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints) object (default `false`).                                                     |
| **autoStart** | Boolean           | should start automatically (default `true`).                                                                                                                                                                                                         |

## Return Values

| Name       | Type      | Description                                                                                                                                                                                                                                                                                                               |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ref**    | RefObject | a `<video>` element reference.                                                                                                                                                                                                                                                                                            |
| **stream** | Object    | the [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) object that you can use with a **video** element as [`srcObject`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject), or with an [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext). |
| **start**  | Function  | a function to start streaming.                                                                                                                                                                                                                                                                                            |
| **stop**   | Function  | a function to stop streaming.                                                                                                                                                                                                                                                                                             |
| **video**  | Object    | a [Media](#media-object) object that has an array of the user video `devices` as well as his `current` device...                                                                                                                                                                                                          |
| **audio**  | Object    | a [Media](#media-object) object that has an array of the user audio `devices` as well as his `current` device...                                                                                                                                                                                                          |

::: tip
If you want to use the **screen capture** set the `display` property of the `video` object to true:

```ts
...
const { stream } = useRTC({ video: { display: true }});
...
```

:::

### `Media` Object

| Name              | Type     | Description                                                                                                                                          |
| ----------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **devices**       | Array    | an array of [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) objects that represent the user's available devices. |
| **current**       | Object   | the current [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo) object, which is the user's current device.          |
| **isEnabled**     | Boolean  | indicates if the current device is enabled (**unmuted** in case of `audio`).                                                                         |
| **hasPermission** | Boolean  | indicates if it has the user permission.                                                                                                             |
| **use**           | Function | use a specific device from the array of `devices`.                                                                                                   |
| **enable**        | Function | enable the current device (**unmute** in case of `audio`), this function can also take a **boolean** to force it to be enabled or disabled.          |

## Example Usage

1. Using the user's camera and microphone:

```tsx
import { useRTC } from 'realtime-hooks';

export default function Example() {
  const { ref, video, audio } = useRTC({ video: true, audio: true });

  const selectVocie = e => {
    const index = e.currentTarget.selectedIndex;
    video.use(video.devices.at(index));
  };

  return (
    <main>
      <select onChange={selectVocie}>
        {video.devices.map(d => (
          <option key={d.deviceId}>{d.label}</option>
        ))}
      </select>
      {!video.hasPermission && <p>you don't have the camera permission!</p>}
      {!audio.hasPermission && <p>you don't have the microphone permission!</p>}
      <video ref={ref} />
    </main>
  );
}
```

2. Using the browser screen capture:

```tsx
import { useRTC } from 'realtime-hooks';

export default function Example() {
  const { ref, video, start, stop } = useRTC({
    video: { display: true },
    autoStart: false
  });

  return (
    <main>
      <button onClick={video.isEnabled ? stop() : start()}>
        {video.isEnabled ? 'stop' : 'start'}
      </button>
      <video ref={ref} />
    </main>
  );
}
```
