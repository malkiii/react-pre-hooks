import { useLayoutEffect, useRef, useState } from 'react';

export const useImageLoader = (src: string, handler?: EventListener) => {
  const imageRef = useRef<HTMLImageElement>(new Image());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useLayoutEffect(() => {
    const handleLoad = (event: any) => {
      setIsLoading(false);
      if (event.type === 'error') setIsError(true);
      else if (handler) handler(event);
    };

    imageRef.current.onload = handleLoad;
    imageRef.current.onerror = handleLoad;
    imageRef.current.crossOrigin = 'anonymous';
    imageRef.current.src = src;
  }, []);

  return { image: imageRef.current, isLoading, isError };
};
