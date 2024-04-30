import { useEffect, useRef, useState } from 'react';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useImageLoader | useImageLoader} hook.
 */
export const useImageLoader = (args: { src: string; handler?: EventListener }) => {
  const imageRef = useRef<HTMLImageElement>(new Image());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const handleLoad = (event: any) => {
      setIsLoading(false);
      if (event.type === 'error') setIsError(true);
      else args.handler?.(event);
    };

    imageRef.current.onload = handleLoad;
    imageRef.current.onerror = handleLoad;
    imageRef.current.crossOrigin = 'anonymous';
    imageRef.current.src = args.src;
  }, []);

  return { ref: imageRef, isLoading, isError };
};
