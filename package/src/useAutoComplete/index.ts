import { useMemo } from 'react';
import { useDebouncedState } from '@/src';

export type AutoCompleteHandler<T> = (search: string, value: T, index: number) => unknown;
export type AutoCompleteOptions<T extends any> = Partial<{
  initial: string;
  sort: boolean;
  debounce: number;
  filter: AutoCompleteHandler<T>;
}>;

const defaultFilter: AutoCompleteHandler<any> = (search, value) => {
  if (!search || typeof value !== 'string') return;
  return value.toLowerCase().startsWith(search.toLowerCase());
};

export const useAutoComplete = <T extends any = string>(
  values: T[],
  options: AutoCompleteOptions<T> = {}
) => {
  const { initial, debounce = 0, filter = defaultFilter } = options;

  const [debouncedValue, setValue, value] = useDebouncedState(initial ?? '', debounce);

  const suggestions = useMemo(() => {
    const result = values.filter((v, i) => filter(debouncedValue, v, i));
    if (options.sort) result.sort();
    return result;
  }, [values, options, debouncedValue]);

  return [value, setValue, suggestions] as const;
};