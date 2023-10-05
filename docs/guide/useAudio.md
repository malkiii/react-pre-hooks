# useAudio

This hook uses an audio element reference as well as its state and controler methods.

## Options

| Name          | Type    | Description                                         |
| ------------- | ------- | --------------------------------------------------- |
| **autoPlay**  | Boolean | auto-play the audio when is mounted.                |
| **muted**     | Boolean | whether the audio is muted initially or not.        |
| **loop**      | Boolean | whether playback should restart after it completes. |
| **startTime** | Number  | The initial playback time (in seconds).             |
| **volume**    | Number  | The initial volume level (0 to 1) (default is `1`). |
| **speed**     | Number  | The initial playback speed (default is `1`).        |

## Return Values

| Name                | Type      | Description                                                                          |
| ------------------- | --------- | ------------------------------------------------------------------------------------ |
| **ref**             | RefObject | the audio element reference.                                                         |
| **isReady**         | Boolean   | Indicates if the audio is ready to play.                                             |
| **isPlaying**       | Boolean   | Indicates if the audio is currently playing.                                         |
| **isPaused**        | Boolean   | Indicates if the audio is paused.                                                    |
| **isEnded**         | Boolean   | Indicates if the audio has ended.                                                    |
| **isMuted**         | Boolean   | Indicates if the audio is muted.                                                     |
| **isWaiting**       | Boolean   | Indicates if the audio is waiting to load.                                           |
| **duration**        | Number    | The total duration of the audio (in seconds).                                        |
| **buffered**        | Number    | The percentage of audio buffered.                                                    |
| **time**            | Number    | The current playback time (in seconds).                                              |
| **volume**          | Number    | The current volume level (0 to 1).                                                   |
| **speed**           | Number    | The current playback speed.                                                          |
| **togglePlayState** | Function  | Toggles the play/pause state of the audio. Optional `play` parameter can force play. |
| **play**            | Function  | Starts playing of the audio.                                                         |
| **pause**           | Function  | Pauses the audio.                                                                    |
| **mute**            | Function  | Mutes or unmutes the audio. Optional `force` parameter can force mute.               |
| **setTime**         | Function  | Sets the current time to the specified value.                                        |
| **setVolume**       | Function  | Sets the volume to the specified value.                                              |
| **setSpeed**        | Function  | Sets the playback speed to the specified value.                                      |
| **seekBy**          | Function  | Seeks the audio by a specified time (in seconds).                                    |

## Example Usage
