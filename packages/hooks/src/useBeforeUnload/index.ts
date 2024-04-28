import { useCallback } from 'react';
import { useEventListener } from '../useEventListener';

export const useBeforeUnload = (returnValue: unknown) => {
  const handleBeforeUnload = useCallback(
    async (event: BeforeUnloadEvent) => {
      const value = returnValue instanceof Function ? await returnValue() : returnValue;
      if (!value) return;

      // For IE6-8 and Firefox prior to version 4
      event.preventDefault();
      event.returnValue = value;

      return value; // For Chrome, Safari, IE8+ and Opera 12+
    },
    [returnValue]
  );

  useEventListener('beforeunload', handleBeforeUnload, { target: () => window });
};
