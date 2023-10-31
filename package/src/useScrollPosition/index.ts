import { RefObject, useCallback, useEffect, useState } from 'react';
import { addEvents } from '../utils';
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
    const progressX = (x / maxScrollX) * 100;
    const progressY = (y / maxScrollY) * 100;

    setPosition({ x, y, progressX, progressY });
  }, []);

  useEffect(() => {
    handleScrolling();
    return addEvents('scroll', handleScrolling, { target: targetRef.current ?? window });
  }, [ref]);

  return { ref: targetRef, ...position };
};
