import { describe, it, expect, afterEach } from 'vitest';
import './nav.js';

describe('dile-nav', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderNav(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-nav');
    await el.updateComplete;
    return el;
  }

  it('renders the menu, title and actions slots', async () => {
    const el = await renderNav(`
      <dile-nav>
        <span slot="title">My App</span>
      </dile-nav>
    `);

    expect(el.shadowRoot.querySelector('slot[name="menu"]')).toBeTruthy();
    expect(el.shadowRoot.querySelector('slot[name="title"]')).toBeTruthy();
    expect(el.shadowRoot.querySelector('slot[name="actions"]')).toBeTruthy();
    expect(el.menu).toBe('left');
  });

  it('reflects the menu property as an attribute', async () => {
    const el = await renderNav('<dile-nav menu="right"></dile-nav>');
    expect(el.getAttribute('menu')).toBe('right');
  });
});
