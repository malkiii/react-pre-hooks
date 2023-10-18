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

export type TimerOptions = {
  initial?: DateProps;
  duration?: number;
  timeout?: number;
  startOnMount?: boolean;
};

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

export const useTimer = (options: TimerOptions = {}) => {
  const timeout = Math.abs(Math.floor(options.timeout ?? 1000));
  const initial = options.initial ?? (options.duration ? {} : undefined);
  const startOnMount = options.startOnMount ?? true;

  const isTimer = !!(options.initial || options.duration);
  const initialDate = useMemo(() => getResolvedDate(initial), []);
  const [datetime, setDatetime] = useState<Date>(initialDate);

  const passing = Math.abs(datetime.getTime() - initialDate.getTime());

  const timer = useInterval(
    () => {
      if (!isTimer) return setDatetime(new Date());
      const duration = options.duration ?? Infinity;

      setDatetime(date => {
        const currentDuration = date.getTime() - initialDate.getTime();
        const nextDatetime =
          currentDuration > duration
            ? new Date(date.getTime() - timeout)
            : currentDuration < duration
            ? new Date(date.getTime() + timeout)
            : date;

        nextDatetime.getTime() - initialDate.getTime() == duration && timer.stop();

        return nextDatetime;
      });
    },
    { timeout, startOnMount }
  );

  const reset = useCallback(
    (value: SetStateAction<Date> | DateProps = initialDate) => {
      if (!isTimer) return;
      timer.stop();
      setDatetime(v => getResolvedDate(value instanceof Function ? value(v) : value));
    },
    [timer]
  );

  return { value: datetime, passing, ...timer, reset };
};
