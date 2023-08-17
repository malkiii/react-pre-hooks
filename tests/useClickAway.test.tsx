import { act, fireEvent, render, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useClickAway } from '@/src';

describe('useClickAway', () => {
  it('should call the handler when clicking outside the target element', () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useClickAway(handler));

    const outside = document.createElement('div');
    document.body.appendChild(outside);

    render(<div ref={result.current}>Click inside</div>);

    fireEvent.click(outside);
    expect(handler).toHaveBeenCalledOnce();
  });

  it('should not call the handler when clicking inside the target element', () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useClickAway(handler));

    render(<div ref={result.current}>Click inside</div>);

    fireEvent.click(result.current.current);
    expect(handler).not.toHaveBeenCalled();
  });
});