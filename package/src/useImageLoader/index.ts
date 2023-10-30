import { useLayoutEffect, useRef, useState } from 'react';

export const useImageLoader = (src: string, handler?: EventListener) => {
  const imageRef = useRef<HTMLImageElement>(new Image());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useLayoutEffect(() => {
    const handleLoad = (event: Event | string) => {
      setIsLoading(false);
      if (typeof event === 'string') return;
      if (handler && event.type !== 'error') handler(event);
    };

    imageRef.current.onload = handleLoad;
    imageRef.current.onerror = handleLoad;
    imageRef.current.crossOrigin = 'anonymous';
    imageRef.current.src = src;
  }, []);

  return { image: imageRef.current, isLoading };
};
