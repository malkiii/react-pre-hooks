import { useState } from 'react';
import { useInterval } from '../useInterval';

export const useClock = (args: { timeout?: number }) => {
  const [clock, setClock] = useState<Date>(new Date());

  useInterval({
    callback: () => setClock(new Date()),
    timeout: Math.abs(Math.floor(args.timeout ?? 1000)),
    startOnMount: true
  });

  return clock;
};
