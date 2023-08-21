import { useRef, useState } from 'react';
import { useIsomorphicEffect } from '@/src';

export const useImageLoading = (imageSrc: string, handler: (event: Event) => any) => {
  const imageRef = useRef<HTMLImageElement>(new Image());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useIsomorphicEffect(() => {
    setIsLoading(true);

    const handleLoad = (event: Event) => {
      setIsLoading(false);
      handler(event);
    };

    imageRef.current.addEventListener('load', handleLoad);
    imageRef.current.crossOrigin = 'anonymous';
    imageRef.current.src = imageSrc;

    return () => {
      imageRef.current.removeEventListener('load', handleLoad);
    };
  }, [imageSrc, handler]);

  return { image: imageRef.current, isLoading };
};
