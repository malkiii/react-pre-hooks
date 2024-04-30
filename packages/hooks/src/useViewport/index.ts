import { useCallback, useState } from 'react';
import { useEventListener } from '../useEventListener';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useViewport | useViewport} hook.
 */
export const useViewport = () => {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  const updateViewport = useCallback(() => {
    setViewport({ width: window.innerWidth ?? 0, height: window.innerHeight ?? 0 });
  }, []);

  useEventListener({
    event: 'resize',
    handler: updateViewport,
    target: () => {
      updateViewport();
      return window;
    },
    passive: true
  });

  return viewport;
};
