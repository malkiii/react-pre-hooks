import { useCallback, useState } from 'react';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useToggle | useToggle} hook.
 */
export const useToggle = <T extends any>(values: T[]) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const toggle = useCallback(
    (value?: React.SetStateAction<T>) => {
      if (!values.length) return;
      setCurrentIndex(index => {
        const currentValue = values[index];
        const newValue = value instanceof Function ? value(currentValue) : value;
        if (newValue !== undefined)
          return values.includes(newValue) ? values.indexOf(newValue) : index;

        return index === values.length - 1 ? 0 : index + 1;
      });
    },
    [values, currentIndex]
  );

  return [values[currentIndex], toggle] as const;
};
