import { useLayoutEffect, useState } from 'react';
import { addEvents } from '../utils';

export type PreferredLanguage = {
  code: string;
  name?: string;
};

export const usePreferredLanguage = () => {
  const [language, setLanguage] = useState<PreferredLanguage>();

  useLayoutEffect(() => {
    const updatePreferredLanguage = () => {
      const code = navigator.language;
      const name = new Intl.DisplayNames([code], { type: 'language' }).of(code);

      setLanguage({ code, name });
    };

    return addEvents('languagechange', updatePreferredLanguage, { ref: window });
  }, []);

  return language;
};
