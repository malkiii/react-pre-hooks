import { SetStateAction, useCallback, useState } from 'react';

export const useStateStatus = <T extends any, S extends string = string>(
  initialValue: T,
  statusHandler: (value: T) => S | null
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
