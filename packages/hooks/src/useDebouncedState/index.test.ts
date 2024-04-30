import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useDebouncedState } from '.';

// Mock setTimeout and clearTimeout for testing
vi.useFakeTimers();

describe('useDebouncedState', () => {
  const delay = 500;
  it('should return initial value', () => {
    const { result } = renderHook(() => useDebouncedState({ initial: 0 }));
    const [debouncedValue] = result.current;

    expect(debouncedValue).toBe(0);
  });

  it('should update debounced value after delay', () => {
    const { result } = renderHook(() => useDebouncedState({ initial: 0, delay }));
    const setValue = result.current[1];

    act(() => setValue(5));
    expect(result.current[2]).toBe(5); // Value before debounce

    act(() => vi.advanceTimersByTime(delay));
    expect(result.current[0]).toBe(5); // Debounced value
  });
});
