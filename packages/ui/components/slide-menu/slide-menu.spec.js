import { describe, it, expect, afterEach } from 'vitest';
import './slide-menu.js';

describe('dile-slide-menu', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderSlideMenu(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-slide-menu');
    await el.updateComplete;
    return el;
  }

  it('renders closed by default with a nav control', async () => {
    const el = await renderSlideMenu('<dile-slide-menu>Content</dile-slide-menu>');
    expect(el.opened).toBe(false);

    const nav = el.shadowRoot.querySelector('nav');
    expect(nav).toBeTruthy();
    expect(nav.getAttribute('aria-expanded')).toBe('false');
  });

  it('opens when toggled', async () => {
    const el = await renderSlideMenu('<dile-slide-menu>Content</dile-slide-menu>');
    el.toggle();
    await el.updateComplete;

    expect(el.opened).toBe(true);
    expect(el.shadowRoot.querySelector('nav').getAttribute('aria-expanded')).toBe('true');
  });

  it('uses the label property in the nav control', async () => {
    const el = await renderSlideMenu('<dile-slide-menu label="Options">Content</dile-slide-menu>');
    expect(el.shadowRoot.querySelector('nav').getAttribute('aria-label')).toBe('Options');
  });
});
