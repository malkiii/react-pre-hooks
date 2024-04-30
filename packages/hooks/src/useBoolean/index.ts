import { useCallback, useState } from 'react';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useBoolean | useBoolean} hook.
 */
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
