import { act, render, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useCss } from '@/src';

describe('useCss', () => {
  it('should append style to the head when no ref is provided', () => {
    const elementStyle = { color: 'rgb(255, 0, 0)', fontSize: '1.12rem' };
    const { result } = renderHook(() =>
      useCss({
        '.target': elementStyle
      })
    );

    render(<div className="target">test</div>);
    const targetElementStyle = window.getComputedStyle(document.querySelector('.target'));

    expect(result.current.cssText).toBe('.target{color:rgb(255, 0, 0);font-size:1.12rem;}');
    expect(targetElementStyle.color).toBe(elementStyle.color);
    expect(targetElementStyle.fontSize).toBe(elementStyle.fontSize);
  });

  it('should apply CSS to the target element', () => {
    const elementStyle = { backgroundColor: 'green', fontWeight: 'bold' };
    const { result } = renderHook(() =>
      useCss({
        button: elementStyle
      })
    );

    render(
      <div id="container" ref={result.current.rootRef}>
        <button>Click</button>
      </div>
    );

    const buttonStyle = window.getComputedStyle(document.querySelector('#container button'));
    expect(buttonStyle.fontWeight).toBe('bold');
  });
});
