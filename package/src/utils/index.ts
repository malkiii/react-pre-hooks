export function objectEqual(actual: unknown, expected: unknown): boolean {
  if (typeof actual == 'object') return JSON.stringify(actual) === JSON.stringify(expected);
  return actual === expected;
}

export function getCurrentMousePosition(event: MouseEvent | TouchEvent) {
  return event instanceof MouseEvent
    ? { x: event.offsetX, y: event.offsetY }
    : { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
}
