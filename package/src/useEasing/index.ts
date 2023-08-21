import { useEffect, useState } from 'react';

type EasingOptions = {
  start: number;
  end: number;
  easingFn?: (x: number) => number;
  duration?: number;
  repeat?: boolean;
  startOnMount?: boolean;
};

export const useEasing = (options: EasingOptions) => {
  const { start, end, repeat, startOnMount } = options;

  const duration = options.duration || 1000;
  const easingFn = options.easingFn || (x => x);

  const [value, setValue] = useState<number>(start);
  const [shouldPlay, setShouldPlay] = useState<boolean>(!!startOnMount);

  const play = () => setShouldPlay(true);
  const pause = () => setShouldPlay(false);
  const reset = () => {
    setShouldPlay(false);
    setValue(start);
  };

  useEffect(() => {
    if (!shouldPlay) return;

    const startTime = performance.now();
    let animationFrameId: number;

    const requestAnimation = () => {
      animationFrameId = window.requestAnimationFrame(updateValue);
    };
    const cancelAnimation = () => {
      window.cancelAnimationFrame(animationFrameId);
    };

    const updateValue = (timestamp: number) => {
      // Ensure progress doesn't exceed 1
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const easedProgress = easingFn(progress);
      const easedCurrentValue = start + easedProgress * (end - start);

      setValue(easedCurrentValue);

      if (progress < 1) requestAnimation();
      else if (repeat) setValue(start);
      else {
        cancelAnimation();
        pause();
      }
    };

    requestAnimation();

    return cancelAnimation;
  }, [shouldPlay, options]);

  return { value, isPlaying: shouldPlay, play, pause, reset };
};
