import { useCallback, useRef, useState } from 'react';
import { useEventListener } from '../useEventListener';
import { useNewRef } from '../utils/useNewRef';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useScrollDirection | useScrollDirection} hook.
 */
export const useScrollDirection = <T extends HTMLElement = HTMLDivElement>(
  ref?: React.RefObject<T> | null
) => {
  const targetRef = useNewRef<T>(ref);

  const prevPosition = useRef({ x: 0, y: 0 });
  const [direction, setDirection] = useState({
    isUp: false,
    isDown: false,
    isLeft: false,
    isRight: false
  });

  const handleScrolling = useCallback(() => {
    const x = targetRef.current?.scrollLeft ?? window.scrollX;
    const y = targetRef.current?.scrollTop ?? window.scrollY;

    const distanceX = x - prevPosition.current.x;
    const distanceY = y - prevPosition.current.y;

    prevPosition.current = { x, y };

    setDirection({
      isLeft: distanceX < 0,
      isRight: distanceX > 0,
      isUp: distanceY < 0,
      isDown: distanceY > 0
    });
  }, []);

  useEventListener({
    event: 'scroll',
    handler: handleScrolling,
    target: () => {
      handleScrolling();
      return targetRef.current ?? window;
    }
  });

  return { ref: targetRef, ...direction };
};
