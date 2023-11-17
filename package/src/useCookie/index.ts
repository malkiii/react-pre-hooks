import { useCallback, useState } from 'react';
import { useEventListener, useIsomorphicEffect } from '..';

export type CookieEvent = CustomEvent<{
  name: string;
  oldValue: string;
  newValue: string;
}>;

export type CookieAttributes = {
  expires?: Date | string;
  maxAge?: number;
  path?: string;
  domain?: string;
  sameSite?: 'Strict' | 'Lax' | 'None';
  secure?: boolean;
  httpOnly?: boolean;
};

declare global {
  interface WindowEventMap {
    'cookiechange': CookieEvent;
  }
}

const getCookie = (name: string): string | null => {
  if (typeof window === 'undefined') return null;

  const match = document.cookie.match(new RegExp(`(?:^|;)\\s*${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

const setCookie = (name: string, value: string, options: CookieAttributes = {}) => {
  const encodedValue = encodeURIComponent(value);

  document.cookie = Object.keys(options).reduce((str, attr) => {
    if (!attr) return str;
    switch (attr as keyof CookieAttributes) {
      case 'expires':
        return str + `; Expires=${new Date(options['expires']!)}`;
      case 'maxAge':
        return str + `; Max-Age=${options['maxAge']!}`;
      case 'domain':
        return str + `; Domain=${options['domain']!}`;
      case 'path':
        return str + `; Path=${options['path']!}`;
      case 'sameSite':
        return str + `; SameSite=${options['sameSite']!}`;
      default:
        return str + `; ${options[attr as keyof CookieAttributes]}`;
    }
  }, `${name}=${encodedValue}`);
};

export const useCookie = (name: string, options: CookieAttributes = {}) => {
  const [value, setValue] = useState<string | null>(null);

  const updateValue: typeof setValue = useCallback(val => {
    setValue(oldValue => {
      const newValue = (val instanceof Function ? val(oldValue) : value) ?? '';
      setCookie(name, newValue, options);

      const cookieEvent = new CustomEvent('cookiechange', {
        detail: { name, oldValue, newValue }
      });

      window.dispatchEvent(cookieEvent);

      return newValue;
    });
  }, []);

  const handleCookieChange = useCallback(
    (e: CookieEvent) => {
      if (e.detail.name === name) setValue(e.detail.newValue);
    },
    [name]
  );

  useIsomorphicEffect(() => {
    getCookie(name);
  }, []);

  useEventListener('cookiechange', handleCookieChange, { target: () => window });

  return [value, updateValue];
};
