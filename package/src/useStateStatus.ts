import { SetStateAction, useCallback, useState } from 'react';

export type StatusHandler<T extends any, S = string> = (value: T) => S | null;

export const useStateStatus = <T extends any, S extends string = string>(
  initialValue: T,
  statusHandler: StatusHandler<T, S>
) => {
  const [value, setValue] = useState(initialValue);
  const [status, setStatus] = useState<S | null>(statusHandler(initialValue));

  const setState = useCallback(
    (state: SetStateAction<T>) => {
      setValue(value => {
        const resolvedValue = state instanceof Function ? state(value) : state;
        setStatus(statusHandler(resolvedValue));

        return resolvedValue;
      });
    },
    [value, statusHandler]
  );

  return [value, setState, status] as const;
};
