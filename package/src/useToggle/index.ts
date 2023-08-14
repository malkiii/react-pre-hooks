import { SetStateAction, useCallback, useState } from 'react';

export const useToggle = <T extends any = boolean>(options: T[] = [false, true] as any) => {
  const [option, setOption] = useState<T>(options[0]);
  const toggle = useCallback(
    (value?: SetStateAction<T>) => {
      if (!options.length) return;
      setOption(current => {
        const resolvedValue = value instanceof Function ? value(current) : value;
        if (resolvedValue) return options.includes(resolvedValue) ? (resolvedValue as T) : current;

        const currentIndex = options.indexOf(current);
        const lastIndex = options.length - 1;
        return currentIndex == lastIndex ? options[0] : options[currentIndex + 1];
      });
    },
    [options]
  );

  return [option, toggle] as const;
};
