# useSpeech

This hook uses a text speaker with available voices as well as its state and controller methods.

## Options

| Name       | Type   | Description                                                                                               |
| ---------- | ------ | --------------------------------------------------------------------------------------------------------- |
| **lang**   | String | A string representing a BCP 47 language tag.                                                              |
| **voice**  | Object | The [SpeechSynthesisVoice](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice) object. |
| **rate**   | Number | The playback speed (default is `1`).                                                                      |
| **pitch**  | Number | The pitch at which the utterance will be spoken at (0 to 2) (default is `1`).                             |
| **volume** | Number | The initial volume level (0 to 1) (default is `1`).                                                       |

## Return Values

| Name                | Type     | Description                                                                                                 |
| ------------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| **voices**          | Array    | An array of [SpeechSynthesisVoices](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice). |
| **lang**            | String   | The language of the current speech synthesis.                                                               |
| **voice**           | Object   | The current selected voice.                                                                                 |
| **rate**            | Number   | The speech rate (speed).                                                                                    |
| **pitch**           | Number   | The speech pitch (intonation).                                                                              |
| **volume**          | Number   | The speech volume.                                                                                          |
| **text**            | String   | The text to be spoken.                                                                                      |
| **isSpeaking**      | Boolean  | Indicates if speech synthesis is in progress.                                                               |
| **isPaused**        | Boolean  | Indicates if speech synthesis is paused.                                                                    |
| **isEnded**         | Boolean  | Indicates if speech synthesis has ended.                                                                    |
| **speak**           | Function | Initiates speech synthesis with the given text.                                                             |
| **togglePlayState** | Function | Toggles the play/pause state of speech synthesis. Optional `play` parameter can force play.                 |
| **resume**          | Function | Resumes speech synthesis if paused.                                                                         |
| **pause**           | Function | Pauses speech synthesis if playing.                                                                         |
| **cancel**          | Function | Cancels speech synthesis.                                                                                   |
| **setLang**         | Function | Sets the language for speech synthesis.                                                                     |
| **setRate**         | Function | Sets the speech rate (speed).                                                                               |
| **setPitch**        | Function | Sets the speech pitch (intonation).                                                                         |
| **setVolume**       | Function | Sets the speech volume.                                                                                     |
| **setVocie**        | Function | Set a specific voice from the `voices`.                                                                     |
| **setCharIndex**    | Function | Set a specific character index for speech synthesis to start or continue with.                              |

## Example Usage

```tsx
import { useSpeech } from 'realtime-hooks';

export default function TextSpeaker() {
  const speech = useSpeech();

  const speak = () => {
    const text = document.querySelector('textarea')?.value;
    if (text) speech.speak(text);
  };

  const selectVocie = e => {
    const index = e.currentTarget.selectedIndex;
    speech.setVoice(speech.voices[index]);
  };

  return (
    <main>
      <div>
        <select onChange={selectVocie}>
          {speech.voices.map(v => (
            <option key={v.name}>{v.name}</option>
          ))}
        </select>
        <button onClick={speak}>Speak</button>
      </div>
      <textarea></textarea>
    </main>
  );
}
```

<iframe src="https://codesandbox.io/embed/usespeech-vvrf2s?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useSpeech" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
