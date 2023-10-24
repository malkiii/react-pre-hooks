import { fireEvent, render, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useScrollPosition } from '.';

describe('useScrollPosition', () => {
  it('should update scroll position when scrolling', () => {
    const { result } = renderHook(() => useScrollPosition());

    render(<div style={{ height: '2000px', width: '2000px' }} />);

    fireEvent.scroll(window, { target: { scrollX: 200, scrollY: 300 } });
    expect(result.current.x).toBe(200);
    expect(result.current.y).toBe(300);
  });
});
