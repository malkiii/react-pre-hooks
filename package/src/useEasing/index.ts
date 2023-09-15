import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type EasingFunction = (x: number) => number;

export type EasingOption = {
  interval: [number, number];
  startOnMount?: boolean;
  easing?: EasingFunction;
  duration?: number;
};

export const useEasing = (options: EasingOption) => {
  const { easing = x => x, duration = 1000, startOnMount = false } = options;

  const [start, end] = options.interval;
  const [value, setValue] = useState<number>(start);
  const [state, setState] = useState({
    isPlaying: false,
    isPaused: false,
    isFinished: false,
    isReversed: false
  });

  const animationRef = useRef(new Animation(new KeyframeEffect(null, null, { duration })));
  const frameRequestId = useRef<number>();

  const handleEasing = useCallback(() => {
    const progress = ((animationRef.current.currentTime as number) ?? 0) / duration;
    setValue(start + easing(progress) * (end - start));

    frameRequestId.current = window.requestAnimationFrame(handleEasing);
  }, []);

  const cancelAnimationFrame = useCallback(() => {
    if (frameRequestId.current !== undefined) window.cancelAnimationFrame(frameRequestId.current);
    frameRequestId.current = undefined;
  }, []);

  const controls = useMemo(
    () => ({
      toggle(play?: boolean) {
        const shouldPlay = play ?? !state.isPlaying;

        if (shouldPlay) {
          if (!state.isPaused) animationRef.current.currentTime = 0;
          if (frameRequestId.current === undefined)
            frameRequestId.current = window.requestAnimationFrame(handleEasing);

          animationRef.current.play();
        } else {
          animationRef.current.pause();
          cancelAnimationFrame();
        }

        setState(s => ({ ...s, isPlaying: shouldPlay, isPaused: !shouldPlay, isFinished: false }));
      },
      play() {
        this.toggle(true);
      },
      pause() {
        this.toggle(false);
      },
      cancel() {
        cancelAnimationFrame();
        animationRef.current.cancel();
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
      cancelAnimationFrame();
    };

    animationRef.current.oncancel = () => stopEasing();
    animationRef.current.onfinish = () => stopEasing(true);
  }, [state.isReversed]);

  useEffect(() => {
    if (startOnMount) animationRef.current.play();
  }, []);

  return { value, ...state, ...controls };
};
