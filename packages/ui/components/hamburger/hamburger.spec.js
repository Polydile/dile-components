import { describe, it, expect, afterEach } from 'vitest';
import './hamburger.js';

describe('dile-hamburger', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderHamburger(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-hamburger');
    await el.updateComplete;
    return el;
  }

  it('renders a button without the is-active class by default', async () => {
    const el = await renderHamburger('<dile-hamburger></dile-hamburger>');
    const button = el.shadowRoot.querySelector('button.hamburger');
    expect(button).toBeTruthy();
    expect(button.classList.contains('is-active')).toBe(false);
  });

  it('adds the is-active class when active is set', async () => {
    const el = await renderHamburger('<dile-hamburger active></dile-hamburger>');
    const button = el.shadowRoot.querySelector('button.hamburger');
    expect(button.classList.contains('is-active')).toBe(true);
  });
});
