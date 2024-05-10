import { useState } from 'react';
import { useIsomorphicEffect } from '../useIsomorphicEffect';

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/usePreferredLanguage | usePreferredLanguage} hook.
 */
export const usePreferredLanguage = () => {
  const [language, setLanguage] = useState<{ code: string; name?: string }>();

  useIsomorphicEffect(() => {
    const updatePreferredLanguage = () => {
      const code = navigator.language;
      const name = new Intl.DisplayNames([code], { type: 'language' }).of(code);

      setLanguage({ code, name });
    };

    updatePreferredLanguage();

    window.addEventListener('languagechange', updatePreferredLanguage);
    return () => window.removeEventListener('languagechange', updatePreferredLanguage);
  }, []);

  return language;
};
