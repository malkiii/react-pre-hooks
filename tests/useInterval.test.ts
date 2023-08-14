import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useInterval } from '@/src';

describe('useInterval', () => {
  const timeout = 1000;

  beforeEach(() => {
    vi.useFakeTimers(); // Use fake timers before each test
  });

  afterEach(() => {
    vi.clearAllTimers(); // Clear timers after each test
  });

  it('should start and execute the handler', () => {
    const handler = vi.fn();
    const callTimes = 3;
    renderHook(() => useInterval(handler, timeout));

    expect(handler).not.toHaveBeenCalled();
    vi.advanceTimersByTime(timeout * callTimes);

    expect(handler).toHaveBeenCalledTimes(callTimes);
  });

  it('should start and execute the handler', () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useInterval(handler, timeout));

    expect(handler).not.toHaveBeenCalled();

    act(() => result.current.start());
    vi.advanceTimersByTime(timeout);

    expect(handler).toHaveBeenCalledOnce();
  });

  it('should stop the interval', () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useInterval(handler, timeout));

    act(() => result.current.start());
    act(() => result.current.stop());
    vi.advanceTimersByTime(timeout);

    expect(handler).not.toHaveBeenCalled();
  });
});
