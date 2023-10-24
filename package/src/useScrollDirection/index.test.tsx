import { fireEvent, render, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useScrollDirection } from '.';

describe('useScrollDirection', () => {
  it('should update "isScrollRight" when scrolling right', async () => {
    const { result, rerender } = renderHook(() => useScrollDirection());

    render(
      <div ref={result.current.ref} style={{ width: '1000px', overflow: 'scroll' }}>
        <div style={{ width: '2000px' }} />
      </div>
    );

    rerender();

    fireEvent.scroll(result.current.ref.current as any, { target: { scrollLeft: 500 } });
    expect(result.current.isScrollRight).toBe(true);
  });

  it('should update "isScrollDown" when scrolling down', () => {
    const { result } = renderHook(() => useScrollDirection());

    render(<div style={{ height: '2000px', width: '2000px' }} />);

    fireEvent.scroll(window, { target: { scrollY: 500 } });
    expect(result.current.isScrollDown).toBe(true);
  });
});
