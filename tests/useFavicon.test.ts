import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { useFavicon } from '@/src';

describe('useFavicon', () => {
  afterEach(() => {
    document.head.innerHTML = null;
  });

  it('should add favicon link tag to document head', () => {
    renderHook(() =>
      useFavicon({
        rel: 'icon',
        href: '/favicon.ico'
      })
    );

    const linkElements = document.head.querySelectorAll('link');
    expect(linkElements.length).toBe(1);
    expect(linkElements[0].rel).toBe('icon');
  });

  it('should remove existing favicon link tags before adding new ones', async () => {
    const existingLink = document.createElement('link');
    existingLink.rel = 'shortcut icon';
    existingLink.href = '/favicon.ico';
    document.head.appendChild(existingLink);

    renderHook(() =>
      useFavicon(
        {
          rel: 'icon',
          href: '/favicon.ico'
        },
        {
          rel: 'apple-touch-icon',
          type: 'image/svg+xml',
          href: '/apple-icon.svg'
        }
      )
    );

    const linkElements = document.head.querySelectorAll('link');
    expect(linkElements.length).toBe(2);
    expect(linkElements[1].rel).toBe('apple-touch-icon');
  });
});
