import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useArray } from '@/src';

describe('useArray', () => {
  it('should be [] by default', () => {
    const { result } = renderHook(() => useArray());
    expect(result.current.value).toEqual([]);
  });

  it('should get and set a value', () => {
    const { result } = renderHook(() => useArray([1, 2, 3, 4, 5]));

    expect(result.current.get(0)).toBe(1);
    expect(result.current.get(-1)).toBe(5);

    act(() => result.current.set(0, 69));
    expect(result.current.get(0)).toBe(69);
    act(() => result.current.set(-2, 59));
    expect(result.current.get(-2)).toBe(59);
  });

  it('should push and pop', () => {
    const { result } = renderHook(() => useArray());

    act(() => result.current.push(0, 1, 2));
    expect(result.current.value).toEqual([0, 1, 2]);

    act(() => result.current.pop());
    expect(result.current.value).toEqual([0, 1]);
    act(() => result.current.pop(0));
    expect(result.current.value).toEqual([1]);
  });

  it('should insert and remove values', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => result.current.insert(0, -1, 0));
    expect(result.current.value).toEqual([-1, 0, 1, 2, 3]);
    act(() => result.current.insert(5, 4, 5));
    expect(result.current.value).toEqual([-1, 0, 1, 2, 3, 4, 5]);

    act(() => result.current.remove(-1, 0));
    expect(result.current.has(0)).toBeFalsy();
    expect(result.current.value).toEqual([1, 2, 3, 4, 5]);
  });

  it('should shift and unshift', () => {
    const { result } = renderHook(() => useArray([3]));

    act(() => result.current.unshift(1, 2));
    expect(result.current.value).toEqual([1, 2, 3]);

    act(() => result.current.shift());
    expect(result.current.value).toEqual([2, 3]);
    act(() => result.current.shift());
    expect(result.current.value).toEqual([3]);
  });

  it('should concat and merge', () => {
    const { result } = renderHook(() => useArray([0]));

    act(() => result.current.concat(1, [2, 3]));
    expect(result.current.value).toEqual([0, 1, 2, 3]);

    act(() => result.current.merge([3, 4], 5));
    expect(result.current.value).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('should map and filter', () => {
    const { result } = renderHook(() => useArray([-2, -1, 0, 1, 2]));

    act(() => result.current.map(value => value * 2));
    expect(result.current.value).toEqual([-4, -2, 0, 2, 4]);

    act(() => result.current.filter(value => value > 0));
    expect(result.current.value).toEqual([2, 4]);
  });

  it('should concat and merge', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => result.current.reset(_ => [0]));
    expect(result.current.value).toEqual([0]);
  });
});
