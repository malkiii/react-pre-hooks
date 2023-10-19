import { CSSProperties, RefObject, useLayoutEffect, useRef, useState } from 'react';
import deepEqual from 'fast-deep-equal';

export type CSSObject = { [K in string]: CSSProps };
export type CSSProps = CSSProperties & { [K in string]?: string | number | null | CSSProps };

export type CSSOptions<T extends HTMLElement> = {
  ref?: RefObject<T> | null;
};

const getCssText = (props: CSSObject[string]) => {
  return Object.keys(props).reduce((cssText, prop) => {
    const val = props[prop];
    if (!val || typeof val === 'object') return cssText;

    const property = prop.replace(/[A-Z]/g, match => '-' + match.toLowerCase());
    const value = val === '' ? "''" : val;

    return cssText + `${property}:${value};`;
  }, '');
};

const styleObjectToString = (css: CSSObject) => {
  return Object.keys(css).reduce((text, selector) => {
    const props = css[selector];
    const nestedCss: CSSObject = {};
    for (const p in props) if (typeof props[p] === 'object') nestedCss[p] = props[p] as CSSProps;

    const cssText: string = getCssText(props) + styleObjectToString(nestedCss);

    return text + `${selector.trim()}{${cssText}}`;
  }, '');
};

export const useCss = <T extends HTMLElement = HTMLDivElement>(
  css: CSSObject = {},
  options: CSSOptions<T> = {}
) => {
  const rootRef = options.ref ?? useRef<T>(null);
  const [currentCss, setCurrentCss] = useState<CSSObject>({});
  const styleRef = useRef<HTMLStyleElement>(document.createElement('style'));

  useLayoutEffect(() => {
    if (deepEqual(css, currentCss)) return;
    styleRef.current.innerHTML = styleObjectToString(css);
    setCurrentCss(css);

    if (!document.documentElement.contains(styleRef.current)) {
      if (rootRef.current) rootRef.current.prepend(styleRef.current);
      else document.head.appendChild(styleRef.current);
    }
  }, [rootRef, css]);

  return { rootRef, cssText: styleRef.current.innerHTML };
};
