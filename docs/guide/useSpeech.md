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
| **play**            | Function | Resumes speech synthesis if paused.                                                                         |
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
    speech.setVoice(speech.voices.at(index));
  };

  return (
    <main>
      <textarea></textarea>
      <div>
        <button onClick={speak}>Speak</button>
        <select onChange={selectVocie}>
          {speech.voices.map(v => (
            <option key={v.name}>{v.name}</option>
          ))}
        </select>
      </div>
    </main>
  );
}
```
