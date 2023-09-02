import { useState } from 'react';
import { addMilliseconds, format, subMilliseconds } from 'date-fns';
import { useInterval } from '@/src';

export type DateObject = Partial<{
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}>;

export type ClockOptions = Partial<{
  format: string;
  timeout: number;
  startOnMount: boolean;
  initial: string | Date | DateObject;
  duration: number;
}>;

const getInitialDate = (date?: ClockOptions['initial']) => {
  if (!date) return new Date();
  if (date instanceof Date) return date;
  if (typeof date === 'string') return new Date(date);

  const {
    year = 2000,
    month = 1,
    day = 1,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0
  } = date;

  return new Date(year, month - 1, day, hours + 1, minutes, seconds, milliseconds);
};

export const useClock = (options: ClockOptions = {}) => {
  const timeout = options.timeout ?? 1000;
  const startOnMount = options.startOnMount ?? true;
  const clockFormat = options.format ?? 'HH:mm:ss a';

  const hasInitialDate = !!options.initial;
  const initialDate = getInitialDate(options.initial);
  const [datetime, setDatetime] = useState<Date>(initialDate);

  const timer = useInterval(
    () => {
      if (!hasInitialDate) return setDatetime(new Date());
      const duration = options.duration ?? Infinity;

      setDatetime(date => {
        const currentDuration = date.getTime() - initialDate.getTime();
        const nextDatetime =
          currentDuration > duration
            ? subMilliseconds(date, timeout)
            : currentDuration < duration
            ? addMilliseconds(date, timeout)
            : date;

        nextDatetime.getTime() - initialDate.getTime() == duration && timer.stop();

        return nextDatetime;
      });
    },
    { timeout, startOnMount }
  );

  const value = format(datetime, clockFormat);

  const reset = () => {
    if (!hasInitialDate) return;
    timer.stop();
    setDatetime(initialDate);
  };

  return { value, datetime, ...timer, reset };
};
