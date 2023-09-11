import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useClock } from '@/src';

vi.useFakeTimers();

describe('useClock', () => {
  const initial = '2000T00:00:00.000Z';
  const duration = 2 * 60 * 1000; // 2 min

  const clockToString = (clock: Date) => {
    const min = clock.getMinutes().toString().padStart(2, '0');
    const sec = clock.getSeconds().toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  it('should return current time', () => {
    const { result } = renderHook(() => useClock());
    expect(result.current.datetime).toEqual(new Date());
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

  it('should stop the timer when the stop time is reached', () => {
    const timeSkip = 31 * 1000;
    const { result } = renderHook(() => useClock({ initial, duration }));

    act(() => vi.advanceTimersByTime(timeSkip));
    expect(clockToString(result.current.datetime)).toBe('00:31');
    expect(result.current.isRunning).toBe(true);

    act(() => vi.advanceTimersByTime(duration - timeSkip));
    expect(result.current.isRunning).toBe(false);
  });

  it('should countdown', () => {
    const timeSkip = 45 * 1000;
    const { result } = renderHook(() => useClock({ initial: { minutes: 5 }, duration: -duration }));

    act(() => vi.advanceTimersByTime(timeSkip));
    expect(clockToString(result.current.datetime)).toBe('04:15');

    act(() => vi.advanceTimersByTime(duration - timeSkip));
    expect(clockToString(result.current.datetime)).toBe('03:00');
    expect(result.current.isRunning).toBe(false);
  });

  it('should reset the time to initial', () => {
    const { result } = renderHook(() => useClock({ initial, duration }));
    act(() => {
      vi.advanceTimersByTime(duration - 45 * 1000);
      result.current.reset();
    });
    expect(clockToString(result.current.datetime)).toEqual('00:00');
  });
});
