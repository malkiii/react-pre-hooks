import { useReducer } from 'react';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useForceUpdate | useForceUpdate} hook.
 */
export const useForceUpdate = () => {
  return useReducer(curr => !curr, false)[1];
};
