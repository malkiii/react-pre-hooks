import { useCallback, useState } from 'react';
import { useEventListener } from '..';

export type CookieEvent = CustomEvent<{
  name: string;
  oldValue: string;
  newValue: string;
}>;

export type CookieAttributes = {
  domain?: string;
  path?: string;
  expires?: Date | string;
  maxAge?: number;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
  priority?: 'Low' | 'Medium' | 'High';
};

declare global {
  interface WindowEventMap {
    'cookiechange': CookieEvent;
  }
}

function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null;

  const match = document.cookie.match(new RegExp(`(?:^|;)\\s*${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, options: CookieAttributes = {}) {
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
      case 'priority':
        return str + `; Priority=${options['priority']!}`;
      default:
        return str + `; ${options[attr as keyof CookieAttributes]}`;
    }
  }, `${name}=${encodedValue}`);
}

export const useCookie = (name: string, options: CookieAttributes & { initial?: string }) => {
  const [value, setValue] = useState(() => getCookie(name) ?? options.initial ?? null);

  const updateValue = useCallback(
    (value: Parameters<typeof setValue>[0], options?: CookieAttributes) => {
      setValue(oldValue => {
        const newValue = (value instanceof Function ? value(oldValue) : value) ?? '';
        setCookie(name, newValue, options);

        const cookieEvent = new CustomEvent('cookiechange', {
          detail: { name, oldValue, newValue }
        });

        window.dispatchEvent(cookieEvent);

        return newValue;
      });
    },
    []
  );

  const handleCookieChange = useCallback((e: CookieEvent) => {
    if (e.detail.name === name) updateValue(e.detail.newValue);
  }, []);

  useEventListener('cookiechange', handleCookieChange, { ref: window });

  return [value, updateValue];
};
