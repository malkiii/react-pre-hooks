import { RefObject, useRef } from 'react';

export const useOrCreateRef = <T extends {} = HTMLDivElement>(ref?: RefObject<T> | T) => {
  if (ref && 'current' in ref) return ref;
  return useRef<T>(ref || null);
};
