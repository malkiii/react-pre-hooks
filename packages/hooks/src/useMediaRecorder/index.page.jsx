import React from 'react';
import { useMediaRecorder } from '.';
import { useMediaDevices } from '../useMediaDevices';

/**
 * @description
 * Handle the [MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) API to record media streams.
 */

/**
 * @example
 */
export function VoiceRecorder() {
  const media = useMediaDevices({ audio: true });
  const recorder = useMediaRecorder({ ref: media.streamRef });

  const [dataUrl, setDataUrl] = React.useState(null);

  const message = media.error
    ? 'Allow access to the microphone!'
    : recorder.error
      ? 'Something went wrong!'
      : recorder.isRecording
        ? 'Recording...'
        : 'Record your voice';

  const handleClick = async () => {
    if (recorder.isRecording) {
      setDataUrl(URL.createObjectURL(await recorder.stop()));
      media.stop();
    } else {
      setDataUrl(null);
      await media.start();
      recorder.start(1000);
    }
  };

  return (
    <div className="demo flex items-center justify-center">
      <div className="wrapper flex items-center w-full max-w-md">
        <p className="flex-1 flex items-center justify-start gap-2 *:inline-block overflow-hidden text-ellipsis">
          {recorder.isRecording && (
            <span className="rounded-full aspect-square h-3 bg-[#ff2525]"></span>
          )}
          {message}
        </p>
        <div className="flex gap-2">
          {dataUrl && (
            <a href={dataUrl} className="border" download="demo">
              Download
            </a>
          )}
          <button className="primary" onClick={handleClick}>
            {recorder.isRecording ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  );
}
