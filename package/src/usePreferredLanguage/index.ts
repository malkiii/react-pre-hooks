import { useState } from 'react';
import { useIsomorphicEffect } from '..';
import { addEvents } from '../utils';

export type PreferredLanguage = {
  code: string;
  name?: string;
};

export const usePreferredLanguage = () => {
  const [language, setLanguage] = useState<PreferredLanguage>();

  useIsomorphicEffect(() => {
    const updatePreferredLanguage = () => {
      const code = navigator.language;
      const name = new Intl.DisplayNames([code], { type: 'language' }).of(code);

      setLanguage({ code, name });
    };

    updatePreferredLanguage();

    return addEvents('languagechange', updatePreferredLanguage, { target: () => window });
  }, []);

  return language;
};
