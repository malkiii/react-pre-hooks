import { LinkHTMLAttributes } from 'react';
import { useIsomorphicEffect } from '@/src';

type FaviconProps = Pick<
  LinkHTMLAttributes<HTMLLinkElement>,
  'title' | 'media' | 'crossOrigin' | 'referrerPolicy'
> & {
  href: string;
  type?: `image/${'png' | 'gif' | 'svg+xml' | 'x-icon'}`;
  sizes?: `${number}x${number}`;
  rel:
    | 'icon'
    | 'mask-icon'
    | 'fluid-icon'
    | 'shortcut icon'
    | 'apple-touch-icon'
    | 'apple-touch-icon-precomposed';
};

const removeFaviconLinkTags = () => {
  for (let link of document.getElementsByTagName('link'))
    if (link.rel.includes('icon')) link.remove();
};

export const useFavicon = (...favicons: FaviconProps[]) => {
  useIsomorphicEffect(() => {
    removeFaviconLinkTags();
    favicons.forEach(favicon => {
      const link = document.createElement('link');
      Object.entries(favicon).forEach(([prop, value]) => link.setAttribute(prop, value));
      document.head.appendChild(link);
    });
  }, [favicons]);
};
