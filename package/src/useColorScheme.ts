import { useEffect, useState } from 'react';

export const useColorScheme = (defaultColorScheme?: 'light' | 'dark') => {
  const [colorScheme, setColorScheme] = useState(defaultColorScheme);

  useEffect(() => {
    if (!('matchMedia' in window)) return;

    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryList | MediaQueryListEvent) => {
      setColorScheme(event.matches ? 'dark' : 'light');
    };

    handleChange(mediaQueryList);
    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, []);

  return colorScheme;
};
