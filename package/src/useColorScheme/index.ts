import { useEffect, useState } from 'react';

export const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useState<'dark' | 'light' | undefined>();

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryList | MediaQueryListEvent) => {
      setColorScheme(event.matches ? 'dark' : 'light');
    };

    handleChange(mediaQueryList);

    mediaQueryList.addEventListener('change', handleChange);
    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, []);

  return colorScheme;
};
