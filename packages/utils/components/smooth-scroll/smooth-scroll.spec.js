import { describe, it, expect, afterEach } from 'vitest';
import './smooth-scroll.js';

describe('dile-smooth-scroll', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderSmoothScroll(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-smooth-scroll');
    await el.updateComplete;
    return el;
  }

  it('renders without throwing', async () => {
    const el = await renderSmoothScroll('<dile-smooth-scroll></dile-smooth-scroll>');
    expect(el).toBeTruthy();
  });

  it('exposes smooth scroll methods without throwing when invoked', async () => {
    const el = await renderSmoothScroll('<dile-smooth-scroll></dile-smooth-scroll>');
    expect(typeof el.smoothScrollToTop).toBe('function');
    expect(() => el.smoothScrollToTop()).not.toThrow();
  });
});
