# useAudioAnalyser

This hook uses and audio analyser to create and an **audio visualizer** from a media element (audio/video) or the user microphone.

## Parameters

1. a function that handles the byte frequecy data of the audio, this function takes two arguments, the data array which is a [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array), and the current [AnalyserNode](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/AnalyserNode), so the API will be: `(dataArray, node) => any`.
2. and some options:

| Name        | Type   | Description                                                                                                                                                                                              |
| ----------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **fftSize** | Number | the window size of the FFT, **Must be a power of 2** between `2^5` and `2^15` (default is `2^11 = 2048`), see [fftSize property](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize). |

## Return Values

| Name        | Type     | Description                                                                                                                   |
| ----------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **node**    | Object   | the current [AnalyserNode](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/AnalyserNode) reference.             |
| **context** | Object   | the current [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext) reference.             |
| **connect** | Function | connect any `audio`/`video` element, or a [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) object. |
| **error**   | Unknown  | cached error if it exists.                                                                                                    |

::: tip
You should set `crossOrigin` to `anonymous` if you're trying to use the analyser node with an audio element to avoid the **CORS access restrictions**:

```tsx
<audio src="/path/to/audio" crossOrigin="anonymous" />
```

:::

## Example Usage

```tsx
import { useAudioAnalyser } from 'realtime-hooks';

export default function Example() {
  const analyser = useAudioAnalyser(
    dataArray => {
      // Draw a bar visualizer
      const canvas = document.querySelector('canvas');
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const maxDataValue = Math.max(...dataArray);
      const barWidth = Math.ceil(canvas.width / dataArray.length) * 1.4;

      dataArray.forEach((value, index) => {
        const barHeight = (value / maxDataValue) * canvas.height;
        const x = index * barWidth * 2;
        const y = canvas.height - barHeight;

        ctx.fillStyle = 'red';
        ctx.fillRect(x, y, barWidth, barHeight);
      });
    },
    { fftSize: 2048 }
  );

  return (
    <main>
      <canvas />
      <audio
        src="/sound.mp3"
        crossOrigin="anonymous"
        onCanPlay={e => analyser.connect(e.currentTarget)}
        controls
      />
    </main>
  );
}
```
