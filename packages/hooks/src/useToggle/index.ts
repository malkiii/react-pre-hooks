import { useCallback, useState } from 'react';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useToggle | useToggle} hook.
 */
export const useToggle = <T>(args: { values: T[]; startIndex?: number }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    return Math.max(0, Math.min(args.startIndex ?? 0, args.values.length - 1));
  });

  const toggle = useCallback(
    (value?: React.SetStateAction<T>) => {
      if (!args.values.length) return;

      setCurrentIndex(index => {
        const currentValue = args.values[index];
        const newValue = value instanceof Function ? value(currentValue) : value;

        if (newValue !== undefined) {
          return args.values.includes(newValue) ? args.values.indexOf(newValue) : index;
        }

        return index === args.values.length - 1 ? 0 : index + 1;
      });
    },
    [args.values]
  );

  return [args.values[currentIndex], toggle] as const;
};
