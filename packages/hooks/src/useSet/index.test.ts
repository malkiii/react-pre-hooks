import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useSet } from '.';

describe('useSet', () => {
  it('should be an empty set by default', () => {
    const { result } = renderHook(() => useSet());
    expect(result.current.value).toEqual(new Set());
  });

  it('should add and delete some values', () => {
    const { result } = renderHook(() => useSet([1, 2, 3]));

    expect(result.current.has(0)).toBe(false);
    expect(result.current.has(2, 3)).toBe(true);

    act(() => result.current.add(0, 1, 2));
    expect(result.current.value).toEqual(new Set([0, 1, 2, 3]));
    act(() => result.current.delete(-1, 3));
    expect(result.current.value).toEqual(new Set([0, 1, 2]));
  });
});
