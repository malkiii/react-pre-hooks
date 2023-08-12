import { useEffect } from 'react';
import { useCounter, useInterval } from '@/src';

type CountdownOptions = {
  seconds: number;
  increment?: boolean;
  delay?: number;
  loop?: boolean;
  step?: number;
};
export const useCountdown = (options: CountdownOptions) => {
  const loops = useCounter();
  const counter = options.increment
    ? useCounter(0, { max: options.seconds, step: options.step })
    : useCounter(options.seconds, { min: 0, step: options.step });

  const interval = useInterval(() => {
    const shouldStop =
      (options.increment && counter.value() == options.seconds) || counter.value() == 0;
    if (shouldStop) {
      if (options.loop) {
        counter.reset();
        loops.inc();
        return;
      } else {
        return interval.stop();
      }
    }
    options.increment ? counter.inc() : counter.dec();
  }, options.delay);

  const reset = () => {
    counter.reset();
    interval.start();
  };

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, [options]);

  return {
    value: counter.value,
    start: interval.start,
    stop: interval.stop,
    loops,
    reset
  };
};
