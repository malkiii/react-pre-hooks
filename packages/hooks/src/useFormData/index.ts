import { useMemo } from 'react';
import { useNewRef } from '../utils/useNewRef';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useFormData | useFormData} hook.
 */
export const useFormData = <T extends Record<string, any>>(
  ref?: React.RefObject<HTMLFormElement> | null
) => {
  const formRef = useNewRef(ref);

  return useMemo(
    () => ({
      ref: formRef,
      getData(): T {
        if (!formRef.current) return {} as any;
        return Object.fromEntries(new FormData(formRef.current)) as T;
      },
      get<K extends keyof T>(key: K): T[K] | null {
        if (!formRef.current) return null;
        return new FormData(formRef.current).get(key as string) as T[K];
      },
      set<K extends keyof T>(key: K, value: T[K]): void {
        if (!formRef.current) return;
        new FormData(formRef.current).set(key as string, value);
      },
      reset(data: T): void {
        Object.entries(data).forEach(([key, value]) => {
          this.set(key, value);
        });
      }
    }),
    []
  );
};
