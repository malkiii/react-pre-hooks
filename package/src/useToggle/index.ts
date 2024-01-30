import { SetStateAction, useCallback, useState } from 'react';

export const useToggle = <T extends any = boolean>(values: T[] = [false, true] as any) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const toggle = useCallback(
    (value?: SetStateAction<T>) => {
      if (!values.length) return;
      setCurrentIndex(index => {
        const currentValue = values[index];
        const newValue = value instanceof Function ? value(currentValue) : value;
        if (newValue !== undefined) values.includes(newValue) ? values.indexOf(newValue) : index;

        return index === values.length - 1 ? 0 : index + 1;
      });
    },
    [values, currentIndex]
  );

  return [values[currentIndex], toggle] as const;
};
