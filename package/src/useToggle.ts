import { SetStateAction, useCallback, useState } from 'react';

export const useToggle = <T extends any = boolean>(options: T[] = [false, true] as any) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const toggle = useCallback(
    (value?: SetStateAction<T>) => {
      if (!options.length) return;
      setCurrentIndex(index => {
        const currentValue = options[index];
        const newValue = value instanceof Function ? value(currentValue) : value;
        if (newValue) return options.includes(newValue) ? options.indexOf(newValue) : index;

        return index === options.length - 1 ? 0 : index + 1;
      });
    },
    [options, currentIndex]
  );

  return [options[currentIndex], toggle] as const;
};
