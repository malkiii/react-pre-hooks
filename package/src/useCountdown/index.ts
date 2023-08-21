import { useEffect, useState } from 'react';
import { useCounter, useInterval } from '@/src';

type CountdownOptions = {
  seconds: number;
  initial?: number;
  timeout?: number;
  startOnMount?: boolean;
  step?: number;
  loop?: boolean;
  increment?: boolean;
};
export const useCountdown = (options: CountdownOptions) => {
  const { increment, startOnMount, timeout, step } = options;

  const loops = useCounter();
  const seconds = Math.abs(Math.abs(options.seconds));
  const initial = options.initial != undefined ? options.initial : increment ? 0 : seconds;
  const stopValue = increment ? initial + seconds : initial - seconds;
  const counterOptions = { max: stopValue, step };

  const counter = useCounter(initial, counterOptions);
  const [isCounting, setIsCounting] = useState<boolean>(!!startOnMount);

  const interval = useInterval(
    () => {
      if (counter.value === stopValue) {
        if (options.loop) return loop();
        else return interval.stop();
      }

      increment ? counter.inc() : counter.dec();
    },
    { timeout: timeout || 1000, startOnMount }
  );

  const loop = () => {
    loops.inc();
    counter.reset();
  };

  const reset = () => {
    counter.reset();
    interval.start();
  };

  const start = () => {
    setIsCounting(true);
    interval.start();
  };

  const stop = () => {
    setIsCounting(false);
    interval.start();
  };

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, [options]);

  return {
    value: counter.value,
    loops: loops.value,
    isCounting,
    start,
    stop,
    loop,
    reset
  } as const;
};
