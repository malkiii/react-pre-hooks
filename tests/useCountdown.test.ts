import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useCountdown } from '@/src';

describe('useCountdown', () => {
  const timeout = 1000;

  beforeEach(() => {
    vi.useFakeTimers(); // Use fake timers before each test
  });

  afterEach(() => {
    vi.clearAllTimers(); // Clear timers after each test
  });

  it('should decrement', () => {
    const seconds = 10;
    const { result } = renderHook(() => useCountdown({ seconds, timeout }));

    act(() => vi.advanceTimersByTime(timeout * 3));
    expect(result.current.value).toBe(7);

    act(() => vi.advanceTimersByTime(timeout * 7));
    expect(result.current.value).toBe(0);

    act(() => vi.advanceTimersByTime(timeout * 3));
    expect(result.current.value).toBe(0);
  });

  it('should increment', () => {
    const initial = 10;
    const seconds = 10;
    const { result } = renderHook(() =>
      useCountdown({ initial, seconds, timeout, increment: true })
    );

    expect(result.current.value).toBe(initial);

    act(() => vi.advanceTimersByTime(timeout * seconds));
    act(() => vi.advanceTimersByTime(timeout * 3));
    expect(result.current.value).toBe(20);
  });
});
