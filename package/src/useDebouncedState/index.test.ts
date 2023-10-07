import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useDebouncedState } from '@/src';

// Mock setTimeout and clearTimeout for testing
vi.useFakeTimers();

describe('useDebouncedState', () => {
  it('should return initial value', () => {
    const { result } = renderHook(() => useDebouncedState(0));
    const [debouncedValue] = result.current;

    expect(debouncedValue).toBe(0);
  });

  it('should update debounced value after delay', () => {
    const delay = 500;
    const { result } = renderHook(() => useDebouncedState(0, { delay }));
    const setValue = result.current[1];

    act(() => setValue(5));
    expect(result.current[2]).toBe(5); // Value before debounce

    act(() => vi.advanceTimersByTime(delay));
    expect(result.current[0]).toBe(5); // Debounced value
  });
});
