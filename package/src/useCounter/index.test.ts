import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useCounter } from '@/src';

describe('useCounter', () => {
  it('should be 0 by default', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.value).toBe(0);
  });

  it('should increments and decrements', () => {
    const step = 3;
    const { result } = renderHook(() => useCounter(0));

    act(() => result.current.inc(step));
    expect(result.current.value).toBe(step * 1);
    act(() => result.current.inc(step));
    expect(result.current.value).toBe(step * 2);

    act(() => result.current.dec(step));
    expect(result.current.value).toBe(step * 1);
    act(() => result.current.dec(step));
    expect(result.current.value).toBe(0);
  });

  it('should change to 69', () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => result.current.set(69));
    expect(result.current.value).toBe(69);
  });

  it('should reset to the initial value', () => {
    const initial = 10;
    const { result } = renderHook(() => useCounter(initial));

    act(() => result.current.set(1));
    act(() => result.current.reset());
    expect(result.current.value).toBe(initial);
  });

  it('should be between 50 and 100', () => {
    const [min, max] = [50, 100];

    const { result } = renderHook(() => useCounter(min, { min: min + 1, max }));
    expect(result.current.value).toBe(min);

    act(() => result.current.set(45));
    expect(result.current.value).toBe(min);
    act(() => result.current.dec());
    expect(result.current.value).toBe(min);

    act(() => result.current.set(105));
    expect(result.current.value).toBe(max);
    act(() => result.current.inc());
    expect(result.current.value).toBe(max);
  });
});
