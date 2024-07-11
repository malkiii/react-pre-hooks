import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useArray } from '.';

describe('useArray', () => {
  it('should be [] by default', () => {
    const { result } = renderHook(() => useArray());
    expect(result.current.array).toEqual([]);
  });

  it('should get and set a value', () => {
    const { result } = renderHook(() => useArray([1, 2, 3, 4, 5]));

    expect(result.current.get(0)).toBe(1);
    expect(result.current.get(-1)).toBe(5);

    act(() => result.current.set(0, 69));
    expect(result.current.get(0)).toBe(69);
    act(() => result.current.set(-2, 69));
    expect(result.current.get(-2)).toBe(69);

    expect(result.current.count(0)).toBe(0);
    expect(result.current.count(69)).toBe(2);
  });

  it('should push and pop', () => {
    const { result } = renderHook(() => useArray());

    act(() => result.current.push(0, 1, 2));
    expect(result.current.array).toEqual([0, 1, 2]);

    act(() => result.current.pop());
    expect(result.current.array).toEqual([0, 1]);
    act(() => result.current.pop(0));
    expect(result.current.array).toEqual([1]);
  });

  it('should insert values', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => result.current.insert(0, -1, 0));
    expect(result.current.has(2, 0)).toBe(true);
    expect(result.current.array).toEqual([-1, 0, 1, 2, 3]);
    act(() => result.current.insert(5, 4, 5));
    expect(result.current.array).toEqual([-1, 0, 1, 2, 3, 4, 5]);
  });

  it('should shift and unshift', () => {
    const { result } = renderHook(() => useArray([3]));

    act(() => result.current.unshift(1, 2));
    expect(result.current.array).toEqual([1, 2, 3]);

    act(() => result.current.shift());
    expect(result.current.array).toEqual([2, 3]);
    act(() => result.current.shift());
    expect(result.current.array).toEqual([3]);
  });
});
