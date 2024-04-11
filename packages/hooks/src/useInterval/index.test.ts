import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useInterval } from '.';

describe('useInterval', () => {
  const timeout = 1000;
  const options = { timeout, startOnMount: true };

  beforeEach(() => {
    vi.useFakeTimers(); // Use fake timers before each test
  });

  afterEach(() => {
    vi.clearAllTimers(); // Clear timers after each test
  });

  it('should not start on mount', () => {
    const callback = vi.fn();
    renderHook(() => useInterval(callback, { timeout }));

    expect(callback).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(timeout));

    expect(callback).not.toHaveBeenCalled();
  });

  it('should start and execute the handler', () => {
    const handler = vi.fn();
    const callTimes = 3;
    renderHook(() => useInterval(handler, options));

    expect(handler).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(timeout * callTimes));

    expect(handler).toHaveBeenCalledTimes(callTimes);
  });

  it('should start and execute the handler', () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useInterval(handler, options));

    expect(result.current.isRunning).toBe(true);
    expect(handler).not.toHaveBeenCalled();

    act(() => result.current.start());
    act(() => vi.advanceTimersByTime(timeout));

    expect(handler).toHaveBeenCalledOnce();
  });

  it('should stop the interval', () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useInterval(handler, options));

    act(() => result.current.start());
    act(() => result.current.stop());
    expect(result.current.isRunning).toBe(false);

    act(() => vi.advanceTimersByTime(timeout));

    expect(handler).not.toHaveBeenCalled();
  });
});
