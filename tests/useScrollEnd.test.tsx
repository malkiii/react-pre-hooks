import { fireEvent, render, renderHook } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { useScrollEnd } from '@/src';

describe('useScrollEnd', () => {
  const mockClientHeight = 500;
  const mockClientWidth = 500;
  const mockScrollHeight = 1000;
  const mockScrollWidth = 1000;

  beforeAll(() => {
    Object.defineProperty(window, 'scrollX', { value: 0, writable: true });
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });

    Object.defineProperty(HTMLElement.prototype, 'scrollLeft', { value: 0, writable: true });
    Object.defineProperty(HTMLElement.prototype, 'scrollTop', { value: 0, writable: true });

    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { value: mockClientWidth });
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { value: mockClientHeight });
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', { value: mockScrollWidth });
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', { value: mockScrollHeight });
  });

  afterAll(() => {
    Object.defineProperty(window, 'scrollX', { value: 0 });
    Object.defineProperty(window, 'scrollY', { value: 0 });

    // delete HTMLElement.prototype.scrollLeft;
    // delete HTMLElement.prototype.scrollTop;
    // delete HTMLElement.prototype.clientWidth;
    // delete HTMLElement.prototype.clientHeight;
    // delete HTMLElement.prototype.scrollWidth;
    // delete HTMLElement.prototype.scrollHeight;
  });

  it('should update isScrollEnd when scrolling to the end vertically', () => {
    const offset = 20;
    const { result, rerender } = renderHook(() => useScrollEnd({ offset }));

    render(
      <div
        ref={result.current.targetRef}
        style={{ height: '1000px', width: '1000px', overflow: 'scroll' }}
      >
        <div style={{ height: '2000px', width: '1000px' }}></div>
      </div>
    );

    rerender();

    fireEvent.scroll(result.current.targetRef.current, {
      target: { scrollTop: mockClientHeight - offset - 10 }
    });
    expect(result.current.isScrollEnd).toBe(false);

    fireEvent.scroll(result.current.targetRef.current, {
      target: { scrollTop: mockClientHeight - offset }
    });
    expect(result.current.isScrollEnd).toBe(true);
  });

  it('should update isScrollEnd when scrolling to the end horizontally', () => {
    const { result, rerender } = renderHook(() => useScrollEnd({ horizontal: true }));

    render(
      <div
        ref={result.current.targetRef}
        style={{ height: '1000px', width: '1000px', overflow: 'scroll' }}
      >
        <div style={{ height: '1000px', width: '2000px' }}></div>
      </div>
    );

    rerender();

    fireEvent.scroll(result.current.targetRef.current, { target: { scrollLeft: mockClientWidth } });
    expect(result.current.isScrollEnd).toBe(true);
  });
});
