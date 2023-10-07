import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useTimer } from '@/src';

vi.useFakeTimers();

describe('useTimer', () => {
  const duration = 2 * 60 * 1000; // 2 min

  const clockToString = (clock: Date) => {
    const min = clock.getMinutes().toString().padStart(2, '0');
    const sec = clock.getSeconds().toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  it('should return current time', () => {
    const { result } = renderHook(() => useTimer());
    expect(result.current.value).toEqual(new Date());
  });

  it('should start the timer on mount', () => {
    const { result } = renderHook(() => useTimer());
    expect(result.current.isRunning).toBe(true);
  });

  it('should stop the timer', () => {
    const { result } = renderHook(() => useTimer());

    act(() => result.current.stop());
    expect(result.current.isRunning).toBe(false);
  });

  it('should stop the timer when the stop time is reached', () => {
    const timeSkip = 31 * 1000;
    const { result } = renderHook(() => useTimer({ duration }));

    act(() => vi.advanceTimersByTime(timeSkip));
    expect(clockToString(result.current.value)).toBe('00:31');
    expect(result.current.isRunning).toBe(true);

    act(() => vi.advanceTimersByTime(duration - timeSkip));
    expect(result.current.isRunning).toBe(false);
  });

  it('should countdown', () => {
    const timeSkip = 45 * 1000;
    const { result } = renderHook(() => useTimer({ initial: { minutes: 5 }, duration: -duration }));

    act(() => vi.advanceTimersByTime(timeSkip));
    expect(result.current.passing).toBe(timeSkip);
    expect(clockToString(result.current.value)).toBe('04:15');

    act(() => vi.advanceTimersByTime(duration - timeSkip));
    expect(clockToString(result.current.value)).toBe('03:00');
    expect(result.current.isRunning).toBe(false);
  });

  it('should reset the time to initial', () => {
    const { result } = renderHook(() => useTimer({ duration }));

    expect(clockToString(result.current.value)).toEqual('00:00');

    act(() => {
      vi.advanceTimersByTime(duration - 45 * 1000);
      result.current.reset();
    });
    expect(clockToString(result.current.value)).toEqual('00:00');

    act(() => result.current.reset({ minutes: 2, seconds: 35 }));
    expect(clockToString(result.current.value)).toEqual('02:35');
  });
});
