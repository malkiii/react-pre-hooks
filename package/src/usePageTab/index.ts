import { HTMLAttributeAnchorTarget, LinkHTMLAttributes, useLayoutEffect, useState } from 'react';
import { EventHandler, useEventListener } from '@/src';

export type WindowFeatures = Partial<{
  target: HTMLAttributeAnchorTarget;
  width: number;
  height: number;
  top: number;
  left: number;
  noopener: boolean;
  noreferrer: boolean;
  menubar: boolean;
  status: boolean;
  toolbar: boolean;
  location: boolean;
  resizable: boolean;
  scrollbars: boolean;
  fullscreen: boolean;
}>;

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

const windowFeaturesToString = (features?: WindowFeatures) => {
  if (!features) return undefined;

  const { target: _, noopener, noreferrer, ...restFeatures } = features;
  const resolvedFeatures = Object.fromEntries(
    Object.entries(restFeatures)
      .filter(([_, value]) => typeof value !== undefined)
      .map(([key, value]) => {
        switch (typeof value) {
          case 'number':
            return [key, value.toString()];
          case 'boolean':
            return [key, value ? 'yes' : 'no'];
          default:
            return [key, value];
        }
      })
  );

  const featuresString = new URLSearchParams(resolvedFeatures).toString().replace('&', ',');

  return `${featuresString}${noopener && ',noopener'}${noreferrer && ',noreferrer'}`;
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

  const open = (url: string | URL, features?: WindowFeatures) => {
    window.open(url, features?.target, windowFeaturesToString(features));
  };

  const duplicate = () => {
    window.open(window.location.href, '_blank');
  };

  useLayoutEffect(() => {
    setTabLocation(new URL(window.location.href));
    setTitle(initialData.title ?? getTitle());
    setFavicon(initialData.favicon ?? getFavicon());
  }, []);

  if (beforeClose)
    useEventListener('beforeunload', event => {
      event.preventDefault();
      return beforeClose(event);
    });

  return {
    location: tabLocation,
    open,
    close: window.close,
    print: window.print,
    reload: window.location.reload,
    duplicate,
    getTitle,
    setTitle,
    getFavicon,
    setFavicon,
    setHash
  };
};
