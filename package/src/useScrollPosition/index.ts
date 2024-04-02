import { RefObject, useCallback, useState } from 'react';
import { useEventListener } from '..';
import { useNewRef } from '../utils/useNewRef';

export const useScrollPosition = <T extends HTMLElement = HTMLDivElement>(
  ref?: RefObject<T> | null
) => {
  const targetRef = useNewRef<T>(ref);
  const [position, setPosition] = useState({ x: 0, y: 0, progressX: 0, progressY: 0 });

  const handleScrolling = useCallback(() => {
    const x = targetRef.current?.scrollLeft ?? window.scrollX;
    const y = targetRef.current?.scrollTop ?? window.scrollY;

    const element = targetRef.current ?? document.body;

    const maxScrollX = element.scrollWidth - element.clientWidth;
    const maxScrollY = element.scrollHeight - element.clientHeight;
    const progressX = maxScrollX ? (x / maxScrollX) * 100 : 1;
    const progressY = maxScrollY ? (y / maxScrollY) * 100 : 1;

    setPosition({ x, y, progressX, progressY });
  }, []);

  useEventListener('scroll', handleScrolling, {
    target: () => {
      handleScrolling();
      return targetRef.current ?? window;
    }
  });

  return { ref: targetRef, ...position };
};
