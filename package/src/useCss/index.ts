import { CSSProperties, RefObject, useLayoutEffect, useRef, useState } from 'react';
import deepEqual from 'fast-deep-equal';

export type CSSObject = { [K in string]: CSSProps | CSSObject };
export type CSSProps = CSSProperties & { [K in string]?: string | number | null };

export type CSSOptions<T extends HTMLElement> = Partial<{
  ref: RefObject<T>;
}>;

const getCssText = (props: CSSObject[string]) => {
  return Object.entries(props)
    .filter(([_, val]) => val && typeof val !== 'object')
    .reduce((cssText, [prop, val]) => {
      const property = prop.replace(/[A-Z]/g, match => '-' + match.toLowerCase());
      const value = val === '' ? "''" : val;

      return cssText + `${property}:${value};`;
    }, '');
};

const styleObjectToString = (css: CSSObject) => {
  return Object.entries(css).reduce((text, [selector, props]) => {
    const nestedCss = Object.fromEntries(
      Object.entries(props).filter(([_, value]) => typeof value === 'object')
    ) as CSSObject;

    const cssText: string = getCssText(props) + styleObjectToString(nestedCss);

    return text + `${selector.trim()}{${cssText}}`;
  }, '');
};

export const useCss = <T extends HTMLElement = HTMLDivElement>(
  css: CSSObject = {},
  options: CSSOptions<T> = {}
) => {
  const rootRef = options.ref || useRef<T>(null);
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
