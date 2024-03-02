import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useToggle } from '.';

describe('useToggle', () => {
  it('should initialize with the first option', () => {
    const { result } = renderHook(() => useToggle([1, 2, 3]));
    expect(result.current[0]).toBe(1);
  });

  it('should toggle between options', () => {
    const { result } = renderHook(() => useToggle([1, 2, 3]));

    const toggle = result.current[1];

    act(() => toggle());
    expect(result.current[0]).toBe(2);

    act(() => toggle());
    expect(result.current[0]).toBe(3);

    act(() => toggle());
    expect(result.current[0]).toBe(1);
  });

  it('should cycle through options', () => {
    const { result } = renderHook(() => useToggle([1, 2, 3]));

    const toggle = result.current[1];

    act(() => toggle(3));
    expect(result.current[0]).toBe(3);

    act(() => toggle(4));
    expect(result.current[0]).toBe(3);

    act(() => toggle());
    expect(result.current[0]).toBe(1);
  });
});
