import { useCallback, useState } from 'react';

export const useBoolean = (initial = false) => {
  const [value, setValue] = useState(initial);

  const toggle = useCallback(
    (value?: React.SetStateAction<boolean>) => {
      setValue(value === undefined ? prev => !prev : value);
    },
    [value]
  );

  return [value, toggle] as const;
};
