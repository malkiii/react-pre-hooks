import { useCallback, useRef } from 'react';
import { useIsomorphicEffect } from './useIsomorphicEffect';

const MIME_TYPES = {
  gif: 'image/gif',
  ico: 'image/x-icon',
  png: 'image/png',
  svg: 'image/svg+xml'
};

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

    const iconType = url.split(/[#?]/)[0].split('.').pop()!.trim().toLowerCase();
    link.current.setAttribute('type', MIME_TYPES[iconType as keyof typeof MIME_TYPES]);
    link.current.setAttribute('href', url);
  }, [url]);
};
