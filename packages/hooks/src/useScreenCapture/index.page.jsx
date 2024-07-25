import React from 'react';
import { useScreenCapture } from '.';

/**
 * @description
 * Use the [Screen Capture](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API) API
 * to capture the screen, window, or browser tab.
 */

/**
 * @example
 */
export function ScreenCapture() {
  const capture = useScreenCapture({ video: true });

  React.useEffect(() => {
    const video = document.querySelector('video');
    video.srcObject = capture.stream;
  }, [capture.stream]);

  return (
    <div className="demo">
      <div className="w-fit max-w-lg mx-auto *:justify-center">
        <video autoPlay playsInline muted className="w-full min-h-60 rounded-md border" />
        {capture.stream ? (
          <button className="border mt-4 w-full justify-center" onClick={() => capture.stop()}>
            Stop
          </button>
        ) : (
          <button
            className="primary mt-4 w-full transition-all"
            disabled={capture.isPending}
            style={{ opacity: capture.isPending ? 0.5 : 1 }}
            onClick={() => capture.start()}
          >
            {capture.isPending ? 'Loading...' : 'Start'}
          </button>
        )}
      </div>
    </div>
  );
}
