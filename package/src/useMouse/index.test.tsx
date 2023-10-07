import { act, fireEvent, render, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useMouse } from '@/src';

describe('useMouse', () => {
  it('should update position when mouse moves', async () => {
    const { result } = renderHook(() => useMouse());

    fireEvent.mouseMove(window, { clientX: 50, clientY: 100 });

    expect(result.current.x).toBe(50);
    expect(result.current.y).toBe(100);
  });

  it('should update position when touch moves', () => {
    const { result } = renderHook(() => useMouse({ touches: true }));

    fireEvent.touchMove(document, { changedTouches: [{ clientX: 150, clientY: 200 }] });

    expect(result.current.x).toBe(150);
    expect(result.current.y).toBe(200);
  });

  it('should update isDown when mouse is pressed or released', () => {
    const { result } = renderHook(() => useMouse());
    const { ref: targetRef } = result.current;

    render(<div ref={targetRef}>Container</div>);

    fireEvent.mouseDown(targetRef.current);
    expect(result.current.isDown).toBe(true);

    fireEvent.mouseUp(targetRef.current);
    expect(result.current.isDown).toBe(false);
  });

  it('should update isDown when touch is started or ended', () => {
    const { result } = renderHook(() => useMouse({ touches: true }));

    fireEvent.touchStart(document.body);
    expect(result.current.isDown).toBe(true);

    fireEvent.touchEnd(document.body);
    expect(result.current.isDown).toBe(false);
  });

  it('should update isOut when mouse enters or leaves', () => {
    const { result } = renderHook(() => useMouse());

    fireEvent.mouseEnter(window);
    expect(result.current.isOut).toBe(false);

    fireEvent.mouseLeave(window);
    expect(result.current.isOut).toBe(true);
  });

  it('should update isOut when touch starts or cancels', () => {
    const { result } = renderHook(() => useMouse({ touches: true }));

    fireEvent.touchStart(document);
    expect(result.current.isOut).toBe(false);

    fireEvent.touchCancel(document);
    expect(result.current.isOut).toBe(true);
  });
});
