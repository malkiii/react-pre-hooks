import { RefObject, useCallback, useEffect, useState } from 'react';
import { useResizeObserver } from '..';
import { useNewRef } from '../utils/useNewRef';

export const useGridLayout = <T extends HTMLElement = HTMLDivElement>(
  ref?: RefObject<T> | null
) => {
  const targetRef = useNewRef<T>(ref);
  const [layoutValues, setLayoutValues] = useState({ rows: 0, columns: 0 });

  const updateLayoutValues = useCallback(() => {
    const container = targetRef.current;
    if (!container) return;

    const containerStyle = window.getComputedStyle(container);
    const rows = containerStyle.gridTemplateRows.trim().split(/\s+/).length;
    const columns = containerStyle.gridTemplateColumns.trim().split(/\s+/).length;

    setLayoutValues({ rows, columns });
  }, []);

  useEffect(updateLayoutValues, []);

  useResizeObserver(updateLayoutValues, { ref: targetRef });

  return { ref: targetRef, ...layoutValues };
};
