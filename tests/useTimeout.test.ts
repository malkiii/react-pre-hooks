import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useTimeout } from '@/src';

// Mock setTimeout and clearTimeout for testing
vi.useFakeTimers();

describe('useTimeout', () => {
  const ms = 1000;

  it(`should execute the callback after ${ms}ms`, () => {
    const callback = vi.fn();
    renderHook(() => useTimeout(callback, ms));

    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(ms);

    expect(callback).toHaveBeenCalledOnce();
  });

  it('should start and execute the callback', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useTimeout(callback, ms));

    expect(callback).not.toHaveBeenCalled();

    act(() => result.current.start());

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(ms);

    expect(callback).toHaveBeenCalledOnce();
  });

  it('should stop the timeout', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useTimeout(callback, ms));

    act(() => result.current.start());
    act(() => result.current.stop());
    vi.advanceTimersByTime(ms);

    expect(callback).not.toHaveBeenCalled();
  });
});
