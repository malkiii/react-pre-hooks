import { SetStateAction } from 'react';

export const browserPrefixes = ['', 'moz', 'webkit', 'o', 'ms'] as const;

export function getPrefixedProperty<T extends {}, K extends keyof T & string>(obj: T, prop: K) {
  const property =
    prop in obj
      ? prop
      : browserPrefixes
          .map(pref => pref + prop.replace(/^\w/, l => l.toUpperCase()))
          .find(p => p in obj);

  if (!property) return;

  const resolvedValue = obj[property as K];
  return resolvedValue instanceof Function ? resolvedValue.bind(obj) : resolvedValue;
}

export function getStateActionValue<T extends any>(state: SetStateAction<T>, value: T) {
  return state instanceof Function ? state(value) : state;
}

export function getPointerPosition(event: MouseEvent | TouchEvent | PointerEvent) {
  const position =
    event instanceof TouchEvent
      ? { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY }
      : { x: event.clientX, y: event.clientY };

  const offset =
    event.currentTarget instanceof HTMLElement
      ? event.currentTarget.getBoundingClientRect()
      : { left: 0, top: 0 };

  return {
    x: position.x - offset.left,
    y: position.y - offset.top
  };
}
