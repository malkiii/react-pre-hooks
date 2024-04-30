import { useEffect, useLayoutEffect } from 'react';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useIsomorphicEffect | useIsomorphicEffect} hook.
 */
export const useIsomorphicEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
