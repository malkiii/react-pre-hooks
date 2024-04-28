import { useState } from 'react';
import { useInterval } from '../useInterval';

export type ClockOptions = {
  timeout?: number;
};

export const useClock = (options: ClockOptions = {}) => {
  const [clock, setClock] = useState<Date>(new Date());

  useInterval(() => setClock(new Date()), {
    timeout: Math.abs(Math.floor(options.timeout ?? 1000)),
    startOnMount: true
  });

  return clock;
};
