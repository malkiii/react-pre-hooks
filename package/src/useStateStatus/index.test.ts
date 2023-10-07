import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useStateStatus } from '@/src';

describe('useStateStatus', () => {
  it('should initialize with initial value and status', () => {
    const statusHandler = vi.fn(() => 'active');
    const { result } = renderHook(() => useStateStatus(0, statusHandler));

    const [value, _, status] = result.current;

    expect(value).toBe(0);
    expect(status).toBe('active');
    expect(statusHandler).toHaveBeenCalledWith(0);
  });

  it('should update value and status when state changes', () => {
    const statusHandler = vi.fn(value => (value > 0 ? 'positive' : 'negative'));
    const { result } = renderHook(() => useStateStatus(0 as number, statusHandler));

    const setValue = result.current[1];

    act(() => setValue(5));
    expect(result.current[0]).toBe(5);
    expect(result.current[2]).toBe('positive');
    expect(statusHandler).toHaveBeenCalledWith(5);

    act(() => setValue(-3));
    expect(result.current[0]).toBe(-3);
    expect(result.current[2]).toBe('negative');
    expect(statusHandler).toHaveBeenCalledWith(-3);
  });
});
