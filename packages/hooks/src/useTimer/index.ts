import { SetStateAction, useCallback, useMemo, useState } from 'react';
import { useInterval } from '..';

export type DateProps = Partial<{
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}>;

const getResolvedDate = (date?: Date | DateProps) => {
  if (!date) return new Date();
  if (date instanceof Date) return date;

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

export type TimerOptions = {
  start?: DateProps;
  duration?: number;
  timeout?: number;
  startOnMount?: boolean;
};

export const useTimer = (options: TimerOptions = {}) => {
  const timeout = Math.abs(Math.floor(options.timeout ?? 1000));
  const initial = options.start ?? (options.duration ? {} : undefined);
  const startOnMount = options.startOnMount ?? true;

  const initialDate = useMemo(() => getResolvedDate(initial), []);
  const [datetime, setDatetime] = useState<Date>(initialDate);

  const passing = Math.abs(datetime.getTime() - initialDate.getTime());

  const handleTimer = useCallback(() => {
    const duration = options.duration ?? Infinity;

    setDatetime(date => {
      const currentDuration = date.getTime() - initialDate.getTime();
      const nextDatetime =
        currentDuration > duration
          ? new Date(date.getTime() - timeout)
          : currentDuration < duration
          ? new Date(date.getTime() + timeout)
          : date;

      if (nextDatetime.getTime() - initialDate.getTime() == duration) timer.stop();

      return nextDatetime;
    });
  }, []);

  const timer = useInterval(handleTimer, { timeout, startOnMount });

  const reset = useCallback(
    (value: SetStateAction<Date> | DateProps = initialDate) => {
      timer.stop();
      setDatetime(v => getResolvedDate(value instanceof Function ? value(v) : value));
    },
    [timer]
  );

  return { value: datetime, passing, ...timer, reset };
};
