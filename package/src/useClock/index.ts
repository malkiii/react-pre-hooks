import { useState } from 'react';
import { addMilliseconds, format, subMilliseconds } from 'date-fns';
import { useInterval } from '@/src';

type ClockOptions = {
  format?: string;
  timeout?: number;
  startOnMount?: boolean;
} & (
  | { initial?: undefined }
  | {
      initial: string | Date;
      stop: string | Date;
    }
);

export const useClock = (options?: ClockOptions) => {
  const timeout = options?.timeout || 1000;
  const startOnMount = options?.startOnMount ?? true;
  const clockFormat = options?.format || 'HH:mm:ss a';

  const initialDate = new Date(options?.initial || new Date());
  const [datetime, setDatetime] = useState<Date>(initialDate);

  const timer = useInterval(
    () => {
      if (!options?.initial) return setDatetime(new Date());
      const stopDate = new Date(options.stop);

      setDatetime(date => {
        if (date > stopDate) return subMilliseconds(date, timeout);
        if (date < stopDate) return addMilliseconds(date, timeout);
        timer.stop();
        return date;
      });
    },
    { timeout, startOnMount }
  );

  const reset = () => {
    if (!options?.initial) return;
    timer.stop();
    setDatetime(initialDate);
    timer.start();
  };

  return { value: format(datetime, clockFormat), datetime, reset, ...timer };
};
