# useVideo

This hook uses a video element reference as well as its state and controller methods.

## Options

| Name          | Type      | Description                                                                                                                                                                                                                                                                                   |
| ------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ref**       | RefObject | the audio element reference.                                                                                                                                                                                                                                                                  |
| **autoPlay**  | Boolean   | auto-play the video when is mounted.                                                                                                                                                                                                                                                          |
| **muted**     | Boolean   | whether the video is muted initially or not.                                                                                                                                                                                                                                                  |
| **loop**      | Boolean   | whether playback should restart after it completes.                                                                                                                                                                                                                                           |
| **startTime** | Number    | The initial playback time (in seconds).                                                                                                                                                                                                                                                       |
| **volume**    | Number    | The initial volume level (0 to 1) (default is `1`).                                                                                                                                                                                                                                           |
| **speed**     | Number    | The initial playback speed (default is `1`).                                                                                                                                                                                                                                                  |
| **caption**   | Object    | an object that has `enabled` that indicates if the caption is enabled by default or not (default is `false`), and `lang` property that determines the caption language with [srclang](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track#srclang) property in the track element. |

## Return Values

| Name                | Type      | Description                                                                          |
| ------------------- | --------- | ------------------------------------------------------------------------------------ |
| **ref**             | RefObject | the video element reference.                                                         |
| **isReady**         | Boolean   | Indicates if the video is ready to play.                                             |
| **isPlaying**       | Boolean   | Indicates if the video is currently playing.                                         |
| **isPaused**        | Boolean   | Indicates if the video is paused.                                                    |
| **isEnded**         | Boolean   | Indicates if the video has ended.                                                    |
| **isMuted**         | Boolean   | Indicates if the video is muted.                                                     |
| **isWaiting**       | Boolean   | Indicates if the video is waiting to load.                                           |
| **duration**        | Number    | The total duration of the video (in seconds).                                        |
| **progress**        | Number    | The percentage of the played time.                                                   |
| **buffered**        | Number    | The percentage of video buffered.                                                    |
| **time**            | Number    | The current playback time (in seconds).                                              |
| **volume**          | Number    | The current volume level (0 to 1).                                                   |
| **speed**           | Number    | The current playback speed.                                                          |
| **caption**         | Object    | The [Caption](#caption-object) object that handles the video subtitles.              |
| **play**            | Function  | Starts playing of the video.                                                         |
| **pause**           | Function  | Pauses the video.                                                                    |
| **togglePlayState** | Function  | Toggles the play/pause state of the video. Optional `play` parameter can force play. |
| **mute**            | Function  | Mutes or unmutes the video. Optional `force` parameter can force mute.               |
| **setTime**         | Function  | Sets the current time to the specified value.                                        |
| **setVolume**       | Function  | Sets the volume to the specified value.                                              |
| **setSpeed**        | Function  | Sets the playback speed to the specified value.                                      |
| **seekBy**          | Function  | Seeks the video by a specified time (in seconds).                                    |

### `Caption` object

| Name          | Type     | Description                                                                           |
| ------------- | -------- | ------------------------------------------------------------------------------------- |
| **list**      | Array    | An array of [TextTracks](https://developer.mozilla.org/en-US/docs/Web/API/TextTrack). |
| **current**   | Object   | The current selected caption.                                                         |
| **isShowing** | Boolean  | Indicates if the caption is enabled or not.                                           |
| **show**      | Function | Show subtitles.                                                                       |
| **hide**      | Function | Hide subtitles.                                                                       |
| **toggle**    | Function | Toggle between show and hide.                                                         |
| **set**       | Function | Set a specific `TextTracks` from the captions `list`.                                 |

## Example Usage

<iframe src="https://codesandbox.io/embed/usevideo-zc3n8s?fontsize=14&hidenavigation=1&module=%2Fsrc%2FComponent.tsx&theme=dark" style="width:100%; height:500px; border:0; overflow:hidden;" title="useVideo" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
