import { fireEvent, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useContextMenu } from '@/src';

describe('useContextMenu', () => {
  it('should update position on right click', async () => {
    const { result } = renderHook(() => useContextMenu());

    fireEvent.contextMenu(window, { clientX: 50, clientY: 100 });

    expect(result.current.offsetX).toBe(50);
    expect(result.current.offsetY).toBe(100);
  });

  it('should show on right click and hide on left click', async () => {
    const { result } = renderHook(() => useContextMenu());
    expect(result.current.canShow).toBe(false);

    fireEvent.contextMenu(window);
    expect(result.current.canShow).toBe(true);

    fireEvent.click(window);
    expect(result.current.canShow).toBe(false);
  });
});
