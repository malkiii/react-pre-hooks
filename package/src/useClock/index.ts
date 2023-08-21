import { useState } from 'react';
import { addMilliseconds, format, subMilliseconds } from 'date-fns';
import { useInterval } from '@/src';

type ClockOptions = {
  format?: string;
  timeout?: number;
  startOnMount?: boolean;
  initial?: string | Date;
  duration?: number;
};

export const useClock = (options?: ClockOptions) => {
  const timeout = options?.timeout || 1000;
  const startOnMount = options?.startOnMount ?? true;
  const clockFormat = options?.format || 'HH:mm:ss a';

  const initialDate = new Date(options?.initial || new Date());
  const [datetime, setDatetime] = useState<Date>(initialDate);
  const [isRunning, setIsRunning] = useState<boolean>(startOnMount);

  const timer = useInterval(
    () => {
      if (!options?.initial) return setDatetime(new Date());
      const duration = options.duration ?? Infinity;

      setDatetime(date => {
        const currentDuration = date.getTime() - initialDate.getTime();
        const nextDatetime =
          currentDuration > duration
            ? subMilliseconds(date, timeout)
            : currentDuration < duration
            ? addMilliseconds(date, timeout)
            : date;

        nextDatetime.getTime() - initialDate.getTime() == duration && stop();

        return nextDatetime;
      });
    },
    { timeout, startOnMount }
  );

  const value = format(datetime, clockFormat);

  const start = () => {
    setIsRunning(true);
    timer.start();
  };

  const stop = () => {
    setIsRunning(false);
    timer.stop();
  };

  const reset = () => {
    if (!options?.initial) return;
    stop();
    setDatetime(initialDate);
  };

  return { value, isRunning, datetime, start, stop, reset };
};