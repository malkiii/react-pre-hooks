import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useClock } from '@/src';

vi.useFakeTimers();

describe('useClock', () => {
  const initial = '2000T00:00:00.000Z';
  const duration = 2 * 60 * 1000; // 2 min

  it('should return current time in default format', () => {
    const { result } = renderHook(() => useClock());
    expect(result.current.value).toMatch(/\d{2}:\d{2}:\d{2} [APap][Mm]/);
  });

  it('should start the timer on mount', () => {
    const { result } = renderHook(() => useClock());
    expect(result.current.isRunning).toBe(true);
  });

  it('should stop the timer', () => {
    const { result } = renderHook(() => useClock());

    act(() => result.current.stop());
    expect(result.current.isRunning).toBe(false);
  });

  it('should use the provided format', () => {
    const format = 'dd HH:mm';
    const { result } = renderHook(() => useClock({ format }));
    expect(result.current.value).toMatch(/\d{2} \d{2}:\d{2}/);
  });

  it('should stop the timer when the stop time is reached', () => {
    const timeSkip = 31 * 1000;
    const { result } = renderHook(() => useClock({ initial, duration, format: 'mm:ss' }));

    act(() => vi.advanceTimersByTime(timeSkip));
    expect(result.current.value).toBe('00:31');
    expect(result.current.isRunning).toBe(true);

    act(() => vi.advanceTimersByTime(duration - timeSkip));
    expect(result.current.isRunning).toBe(false);
  });

  it('should countdown', () => {
    const timeSkip = 45 * 1000;
    const params = { initial: '2000T00:05:00.000Z', duration: -duration, format: 'mm:ss' };
    const { result } = renderHook(() => useClock(params));

    act(() => vi.advanceTimersByTime(timeSkip));
    expect(result.current.value).toBe('04:15');

    act(() => vi.advanceTimersByTime(duration - timeSkip));
    expect(result.current.value).toBe('03:00');
    expect(result.current.isRunning).toBe(false);
  });

  it('should reset the time to initial', () => {
    const { result } = renderHook(() => useClock({ initial, duration, format: 'mm:ss' }));
    act(() => {
      vi.advanceTimersByTime(duration - 45 * 1000);
      result.current.reset();
    });
    expect(result.current.value).toEqual('00:00');
  });
});
