import { SetStateAction } from 'react';

export function getStateActionValue<T extends any>(state: SetStateAction<T>, value: T) {
  return state instanceof Function ? state(value) : state;
}

export function getCurrentMousePosition(event: MouseEvent | TouchEvent) {
  return event instanceof MouseEvent
    ? { x: event.offsetX, y: event.offsetY }
    : { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
}

export function getPrefixedProperty<T extends {}, K extends keyof T & string>(obj: T, prop: K) {
  if (prop in obj) return obj[prop];

  const capitalizedProp = prop.charAt(0).toUpperCase() + prop.substring(1);
  const prefixedProps = ['moz', 'webkit', 'o', 'ms'].map(pref => pref + capitalizedProp);
  const property = prefixedProps.find(p => p in obj);
  if (property) return obj[property as K];
}

export function download(url: string, name = '') {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = name;

  document.body.appendChild(a);
  a.click();
  a.remove();
}
