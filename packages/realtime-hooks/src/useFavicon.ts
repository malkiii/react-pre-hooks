import { useCallback, useRef } from 'react';
import { useIsomorphicEffect } from '.';

const faviconTypes = {
  gif: 'image/gif',
  ico: 'image/x-icon',
  png: 'image/png',
  svg: 'image/svg+xml'
};

type FaviconExtention = keyof typeof faviconTypes;

export const useFavicon = (url: string) => {
  const link = useRef<HTMLLinkElement>();

  const createIconLink = useCallback(() => {
    const existingIcons = document.querySelectorAll<HTMLLinkElement>('link[rel*="icon"]');
    existingIcons.forEach(link => document.head.removeChild(link));

    const element = document.createElement('link');
    element.rel = 'shortcut icon';
    document.head.appendChild(element);

    return element;
  }, []);

  useIsomorphicEffect(() => {
    if (!url) return;
    if (!link.current) link.current = createIconLink();

    const iconExtention = url.split(/[#?]/)[0].split('.').pop()!.trim().toLowerCase();
    link.current.setAttribute('type', faviconTypes[iconExtention as FaviconExtention]);
    link.current.setAttribute('href', url);
  }, [url]);
};
