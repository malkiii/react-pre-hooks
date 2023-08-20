export function objectEqual(actual: unknown, expected: unknown): boolean {
  if (typeof actual == 'object') return JSON.stringify(actual) === JSON.stringify(expected);
  return actual === expected;
}
