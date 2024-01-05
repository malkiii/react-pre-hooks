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
import { useMediaDevices, useMediaRecorder } from 'react-pre-hooks';

export default function VideoRecorder() {
  const media = useMediaDevices({ startOnMount: false });
  const recorder = useMediaRecorder({ mimeType: 'video/webm;codecs=vp8' });

  const handleClick = async () => {
    if (recorder.isRecording) {
      const blob = await recorder.stop({ type: 'video/mp4' });
      download(URL.createObjectURL(blob));

      media.stop();
    } else {
      await media.start({ video: true, audio: true });

      recorder.start(media.stream.current);
    }
  };

  return (
    <main>
      <video ref={media.ref} />
      <button onClick={handleClick}>
        {recorder.isRecording ? 'stop' : 'start'} Recording
      </button>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usemediarecorder-hqgfxh?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useMediaRecorder" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
