import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useTimeout } from '.';

// Mock setTimeout and clearTimeout for testing
vi.useFakeTimers();

describe('useTimeout', () => {
  const timeout = 1100;
  const options = { timeout, startOnMount: true };

  it('should not start on mount', () => {
    const callback = vi.fn();
    renderHook(() => useTimeout({ callback, timeout }));

    expect(callback).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(timeout));

    expect(callback).not.toHaveBeenCalled();
  });

  it(`should execute the callback after ${timeout}ms`, () => {
    const callback = vi.fn();
    renderHook(() => useTimeout({ callback, ...options }));

    expect(callback).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(timeout));

    expect(callback).toHaveBeenCalledOnce();
  });

  it('should start and execute the callback', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useTimeout({ callback, ...options }));

    expect(result.current.isActive).toBe(options.startOnMount);
    expect(callback).not.toHaveBeenCalled();

    act(() => result.current.start());

    expect(callback).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(timeout));

    expect(result.current.isActive).toBe(false);
    expect(callback).toHaveBeenCalledOnce();
  });

  it('should cancel the timeout', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useTimeout({ callback, ...options }));

    act(() => result.current.start());
    act(() => result.current.cancel());
    act(() => vi.advanceTimersByTime(timeout));
    // vi.advanceTimersByTime(timeout);

    expect(callback).not.toHaveBeenCalled();
  });
});
