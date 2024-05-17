import React from 'react';
import { useMediaDevices } from '.';

/**
 * @description
 * Use the user media devices (**camera** and **microphone**) with
 * their [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) object.
 */

/**
 * @example
 */
export function Camera() {
  const media = useMediaDevices({ video: true, audio: true });

  React.useEffect(() => {
    if (media.isActive) {
      const video = document.querySelector('video');
      video.srcObject = media.streamRef.current;
    }
  }, [media.isActive]);

  return (
    <div className="demo">
      <div className="w-fit max-w-md mx-auto *:justify-center">
        <video autoPlay muted className="w-full min-h-60 rounded-md border" />
        {media.isActive ? (
          <button className="border mt-4 w-full justify-center" onClick={() => media.stop()}>
            Stop
          </button>
        ) : (
          <button className="primary mt-4 w-full" onClick={() => media.start()}>
            Start
          </button>
        )}
      </div>
    </div>
  );
}
