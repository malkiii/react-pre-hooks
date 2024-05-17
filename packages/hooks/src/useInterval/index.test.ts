import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useInterval } from '.';

describe('useInterval', () => {
  const timeout = 1000;
  const options = { timeout, startOnMount: true };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should not start on mount', () => {
    const callback = vi.fn();
    renderHook(() => useInterval({ callback, timeout }));

    expect(callback).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(timeout));

    expect(callback).not.toHaveBeenCalled();
  });

  it('should start and execute the handler', () => {
    const callback = vi.fn();
    const callTimes = 3;
    renderHook(() => useInterval({ callback, ...options }));

    expect(callback).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(timeout * callTimes));

    expect(callback).toHaveBeenCalledTimes(callTimes);
  });

  it('should start and execute the callback', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useInterval({ callback, ...options }));

    expect(result.current.isActive).toBe(true);
    expect(callback).not.toHaveBeenCalled();

    act(() => result.current.start());
    act(() => vi.advanceTimersByTime(timeout));

    expect(callback).toHaveBeenCalledOnce();
  });

  it('should stop the interval', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useInterval({ callback, ...options }));

    act(() => result.current.start());
    act(() => result.current.stop());
    expect(result.current.isActive).toBe(false);

    act(() => vi.advanceTimersByTime(timeout));

    expect(callback).not.toHaveBeenCalled();
  });
});
