import { useEffect, useMemo, useRef, useState } from 'react';
import { useAnimationFrame } from '..';

export type EasingFunction = (x: number) => number;
export type EasingOption = {
  interval?: [number, number];
  easing?: EasingFunction;
  duration?: number;
  startOnMount?: boolean;
};

export const useEasing = (options: EasingOption) => {
  const { interval = [0, 1], easing = x => x, duration = 1000, startOnMount = false } = options;
  const [start, end] = interval;

  const animationRef = useRef(new Animation(new KeyframeEffect(null, null, { duration })));
  const [value, setValue] = useState<number>(start);
  const [state, setState] = useState({
    isPlaying: startOnMount,
    isPaused: false,
    isFinished: false,
    isReversed: false
  });

  const frame = useAnimationFrame(() => {
    const progress = ((animationRef.current.currentTime as number) ?? 0) / duration;
    setValue(start + easing(progress) * (end - start));
  });

  const controls = useMemo(
    () => ({
      togglePlayState(play?: boolean) {
        const shouldPlay = play ?? !state.isPlaying;
        shouldPlay ? this.play() : this.pause();
        setState(s => ({ ...s, isPlaying: shouldPlay, isPaused: !shouldPlay, isFinished: false }));
      },
      play() {
        if (!state.isPaused) animationRef.current.currentTime = 0;
        frame.start();
        animationRef.current.play();
        setState(s => ({ ...s, isPlaying: true, isPaused: false, isFinished: false }));
      },
      pause() {
        animationRef.current.pause();
        frame.cancel();
        setState(s => ({ ...s, isPlaying: false, isPaused: true }));
      },
      cancel() {
        animationRef.current.cancel();
        frame.cancel();
      },
      reverse() {
        animationRef.current.reverse();
        if (!state.isPlaying) this.play();
        setState(s => ({ ...s, isReversed: !s.isReversed }));
      }
    }),
    [state]
  );

  useEffect(() => {
    const stopEasing = (isFinished: boolean = false) => {
      if (isFinished) setValue(state.isReversed ? start : end);
      setState(s => ({ ...s, isPlaying: false, isPaused: false, isFinished }));
      frame.cancel();
    };

    animationRef.current.oncancel = () => stopEasing();
    animationRef.current.onfinish = () => stopEasing(true);
  }, [state.isReversed]);

  useEffect(() => {
    if (startOnMount) animationRef.current.play();
  }, []);

  return { ...state, ...controls, value };
};
