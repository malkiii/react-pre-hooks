import { act, fireEvent, render, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useScroll } from '@/src';

describe('useScroll', () => {
  it('should update scroll position when scrolling', () => {
    const { result } = renderHook(() => useScroll());

    render(<div style={{ height: '2000px', width: '2000px' }} />);

    fireEvent.scroll(window, { target: { scrollX: 200, scrollY: 300 } });
    expect(result.current.x).toBe(200);
    expect(result.current.y).toBe(300);
  });

  it('should update "isScrollRight" when scrolling right', async () => {
    const { result, rerender } = renderHook(() => useScroll());

    render(
      <div ref={result.current.ref} style={{ width: '1000px', overflow: 'scroll' }}>
        <div style={{ width: '2000px' }} />
      </div>
    );

    rerender();

    fireEvent.scroll(result.current.ref.current, { target: { scrollLeft: 500 } });
    expect(result.current.isScrollRight).toBe(true);
  });

  it('should update "isScrollDown" when scrolling down', () => {
    const { result } = renderHook(() => useScroll());

    render(<div style={{ height: '2000px', width: '2000px' }} />);

    fireEvent.scroll(window, { target: { scrollY: 500 } });
    expect(result.current.isScrollDown).toBe(true);
  });
});
