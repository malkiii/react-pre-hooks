import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useSet } from '@/src';

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

  it('should merge two sets', () => {
    const { result } = renderHook(() => useSet(new Set([1, 2, 3])));

    act(() => result.current.union([1, 3, 4, 5]));
    expect(result.current.values().sort()).toEqual([1, 2, 3, 4, 5]);
  });

  it('should find the target value', () => {
    const { result } = renderHook(() => useSet(new Set([{ a: 1 }, { b: 2 }])));

    expect(result.current.has({ a: 1 })).toBe(true);
    expect(result.current.find(v => v.b === 2)).toEqual({ b: 2 });
  });

  it('should clear and reset', () => {
    const { result } = renderHook(() => useSet([0]));

    act(() => result.current.clear());
    expect(result.current.value).toEqual(new Set());

    act(() => result.current.reset(new Set([1])));
    expect(result.current.values()).toEqual([1]);
  });
});
