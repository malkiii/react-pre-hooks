import { LinkHTMLAttributes, useLayoutEffect, useState } from 'react';
import { EventHandler, useEventListener } from '@/src';

type LinkAttributes = LinkHTMLAttributes<HTMLLinkElement>;
export type FaviconAttributes = {
  title?: string;
  media?: string;
  href: string;
  type?: `image/${'png' | 'gif' | 'svg+xml' | 'x-icon'}` | (string & {});
  sizes?: string;
  crossOrigin?: LinkAttributes['crossOrigin'] | (string & {}) | null;
  referrerPolicy?: LinkAttributes['crossOrigin'] | (string & {}) | null;
};

export type PageTabProps = Partial<{
  title: string;
  favicon: FaviconAttributes;
  beforeClose: EventHandler<Window, 'beforeunload'>;
}>;

const createOrUpdateValueOf = <T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  querySelector: string,
  props: Record<string, any>
) => {
  let element: HTMLElementTagNameMap[T] | null;
  element = document.querySelector(querySelector);
  if (element) element.remove();
  if (!element) element = document.createElement(tagName);
  Object.entries(props).forEach(([prop, value]) => element?.setAttribute(prop, value));
  return element;
};

const faviconQuerySelector = 'link[rel="icon"], link[rel="shortcut icon"]';

const getTitle = () => {
  return document.title;
};

const getFavicon = (tag?: HTMLLinkElement): FaviconAttributes => {
  const element: HTMLLinkElement | null = tag || document.querySelector(faviconQuerySelector);
  if (!element) return { href: '' };
  const { title, media, href = '', type, sizes = [], crossOrigin, referrerPolicy } = element;
  return { title, media, href, type, sizes: sizes[0], crossOrigin, referrerPolicy };
};

export const usePageTab = (pageHead: PageTabProps = {}) => {
  const { beforeClose, ...initialData } = pageHead;
  const [tabLocation, setTabLocation] = useState<URL>();

  const setTitle = (title: string) => {
    document.title = title;
  };

  const setFavicon = (favicon: FaviconAttributes) => {
    document.head.appendChild(
      createOrUpdateValueOf('link', faviconQuerySelector, { rel: 'icon', ...favicon })
    );
  };

  const setHash = (hash: string) => {
    window.location.hash = hash;
    setTabLocation(new URL(window.location.href));
  };

  useLayoutEffect(() => {
    setTabLocation(new URL(window.location.href));
    setTitle(initialData.title ?? getTitle());
    setFavicon(initialData.favicon ?? getFavicon());
  }, []);

  if (beforeClose) useEventListener('beforeunload', beforeClose);

  return {
    location: tabLocation,
    open: window.open,
    close: window.close,
    print: window.print,
    reload: window.location.reload,
    duplicate: () => window.open(window.location.href),
    getTitle,
    setTitle,
    getFavicon,
    setFavicon,
    setHash
  };
};
