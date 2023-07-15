import { DependencyList, useCallback, useEffect, useRef } from 'react';

export const useInterval = (handler: Function, timeout?: number, deps: DependencyList = []) => {
  const interval = useRef<any>();
  const handlerRef = useRef<TimerHandler>(handler);

  const clear = () => {
    interval.current && window.clearInterval(interval.current);
  };

  const startInterval = useCallback(() => {
    clear();
    interval.current = window.setInterval(handlerRef.current, timeout);
    return clear;
  }, [timeout]);

  useEffect(startInterval, [timeout, ...deps]);
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  return {
    start: startInterval,
    stop: clear
  } as const;
};
