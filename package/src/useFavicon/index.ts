import { useCallback, useRef } from 'react';
import { useIsomorphicEffect } from '@/src';

const faviconTypes = {
  gif: 'image/gif',
  ico: 'image/x-icon',
  png: 'image/png',
  svg: 'image/svg+xml'
} as const;

type FaviconExtention = keyof typeof faviconTypes;

export const useFavicon = (url: string) => {
  const link = useRef<HTMLLinkElement>();

  const createIconLink = useCallback(() => {
    const linksQuerySelector = 'link[rel*="icon"], link[rel*="shortcut icon"]';
    const existingIcons = document.querySelectorAll<HTMLLinkElement>(linksQuerySelector);
    existingIcons.forEach(link => document.head.removeChild(link));

    const link = document.createElement('link');
    link.rel = 'shortcut icon';
    document.head.appendChild(link);

    return link;
  }, []);

  useIsomorphicEffect(() => {
    if (!url) return;
    if (!link.current) link.current = createIconLink();

    const iconExtention = url.split(/[#?]/)[0].split('.').pop()!.trim().toLowerCase();
    link.current.type = faviconTypes[iconExtention as FaviconExtention];
    link.current.href = url;
  }, [url]);
};
