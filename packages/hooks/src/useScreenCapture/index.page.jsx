import React from 'react';
import { useScreenCapture } from '.';

/**
 * @description
 * Use the [Screen Capture](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API) API to capture the screen, window, or browser tab.
 */

/**
 * @example
 */
export function ScreenCapture() {
  const capture = useScreenCapture({ video: true });

  React.useEffect(() => {
    if (capture.isEnabled) {
      const video = document.querySelector('video');
      video.srcObject = capture.streamRef.current;
    }
  }, [capture.isEnabled]);

  return (
    <div className="demo">
      <div className="w-fit max-w-lg mx-auto *:justify-center">
        <video autoPlay muted className="w-full min-h-60 rounded-md border" />
        {capture.isEnabled ? (
          <button className="border mt-4 w-full justify-center" onClick={() => capture.stop()}>
            Stop
          </button>
        ) : (
          <button className="primary mt-4 min-w-[320px] w-full" onClick={() => capture.start()}>
            Start
          </button>
        )}
      </div>
    </div>
  );
}
