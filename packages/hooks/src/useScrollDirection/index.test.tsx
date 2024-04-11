import { fireEvent, render, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useScrollDirection } from '.';

describe('useScrollDirection', () => {
  it('should update "isScrollDown" when scrolling down', () => {
    const { result } = renderHook(() => useScrollDirection());

    render(<div style={{ height: '2000px', width: '2000px' }} />);

    fireEvent.scroll(window, { target: { scrollY: 500 } });
    expect(result.current.isDown).toBe(true);
  });

  it('should update "isScrollRight" when scrolling right', async () => {
    const { result, rerender } = renderHook(() => useScrollDirection());

    render(<div style={{ height: '2000px', width: '2000px' }} />);

    fireEvent.scroll(window, { target: { scrollX: 1000 } });
    expect(result.current.isRight).toBe(true);
  });
});
