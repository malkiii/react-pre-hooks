import { SetStateAction } from 'react';

export function getStateActionValue<T extends any>(state: SetStateAction<T>, value: T) {
  return state instanceof Function ? state(value) : state;
}

export function getCurrentMousePosition(event: MouseEvent | TouchEvent) {
  return event instanceof MouseEvent
    ? { x: event.offsetX, y: event.offsetY }
    : { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
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

/* prettier-ignore */
export function deepEqual(a: any, b: any) {
  if (a === b) return true;

  if (a.constructor !== b.constructor) return false;
  if (Array.isArray(a) && Array.isArray(b) && a.length !== b.length) return false;
  if (((a instanceof Set && b instanceof Set) || (a instanceof Map && b instanceof Map)) && a.size !== b.size) return false;
  if (Object.keys(a as {}).length !== Object.keys(b as {}).length) return false;

  return JSON.stringify(a) === JSON.stringify(b);
}
