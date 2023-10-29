# useMediaRecorder

Generate a recorded (video/audio) from a media **stream** object using the media recorder with its state and controller methods.

## Options

- It takes the [MediaRecorder options](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/MediaRecorder#options).

::: warning
You should always set the `type` options to a **supported Mediarecorder MIME type** to get the best results, for example:

```tsx
const recorder = useMediaRecorder({ mimeType: 'video/webm;codecs=vp9,opus' });
```

:::

## Return Values

| Name                | Type     | Description                                                                                                                                                                                                                                           |
| ------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **isActive**        | Boolean  | indicates if the recorder is active (paused or recording) or not.                                                                                                                                                                                     |
| **isRecording**     | Boolean  | indicates if the recorder is recording or not.                                                                                                                                                                                                        |
| **isPaused**        | Boolean  | indicates if the recorder is paused or not.                                                                                                                                                                                                           |
| **error**           | Unknown  | cached error if it exists.                                                                                                                                                                                                                            |
| **start**           | Function | the start recording function, and it takes the [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) object, and an optional [timeslice](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/start#timeslice) value. |
| **stop**            | Function | the stop function that takes the `type` of the recorded (video/audio) (default is `video/mp4`) as an option, and return a recorded [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) object in a **Primise**.                             |
| **pause**           | Function | pause the recording.                                                                                                                                                                                                                                  |
| **resume**          | Function | resume the recording.                                                                                                                                                                                                                                 |
| **togglePlayState** | Function | toggle between pause and resume, and it can take a `boolean` to force it.                                                                                                                                                                             |

## Example Usage

<!-- prettier-ignore -->
```tsx
import { useMediaDevices, useMediaRecorder } from 'realtime-hooks';

export default function Example() {
  const { ref, stream } = useMediaDevices({ video: true, audio: true });
  const recorder = useMediaRecorder({ mimeType: 'video/webm;codecs=vp8' });

  const handleClick = () => {
    if (recorder.isRecording) {
      recorder
        .stop({ type: 'video/mp4' })
        .then(blob => download(URL.createObjectURL(blob)))
    } else {
      recorder.start(stream.current);
    }
  };

  return (
    <main>
      <video ref={ref} />
      <button onClick={handleClick}>
        {video.isRecording ? 'stop' : 'start'}
      </button>
    </main>
  );
}
```
