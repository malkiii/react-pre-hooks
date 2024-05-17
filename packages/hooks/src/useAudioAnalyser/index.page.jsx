import React from 'react';
import { useAudioAnalyser } from '.';

/**
 * @description
 * Use the [AnalyserNode](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode) API to analyze audio data.
 */

/**
 * @example
 */
export function BarVisualizer() {
  const analyser = useAudioAnalyser({
    handler: dataArray => {
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

        ctx.fillStyle = index % 3 ? '#00aaff' : '#00cde0';
        ctx.fillRect(x, y, barWidth, barHeight);
      });
    },
    fftSize: 2048
  });

  return (
    <div className="demo">
      <div className="max-w-xl mx-auto">
        <div className="border rounded-md mb-4">
          <canvas height="1360" className="min-w-full h-[280px] pt-4" />
        </div>
        <audio
          className="block rounded-full border w-full"
          src="/assets/audio.wav"
          onPlay={e => analyser.connect(e.currentTarget)}
          controls
        />
      </div>
    </div>
  );
}
