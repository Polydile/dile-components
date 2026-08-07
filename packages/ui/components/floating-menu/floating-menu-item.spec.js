import { describe, it, expect, afterEach } from 'vitest';
import './floating-menu-item.js';

describe('dile-floating-menu-item', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderItem(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-floating-menu-item');
    await el.updateComplete;
    return el;
  }

  it('renders the slotted content inside a link with the href property', async () => {
    const el = await renderItem('<dile-floating-menu-item href="/home">Home</dile-floating-menu-item>');
    const link = el.shadowRoot.querySelector('a');
    expect(link.getAttribute('href')).toBe('/home');
    expect(el.textContent.trim()).toBe('Home');
  });

  it('sets role listitem on the host', async () => {
    const el = await renderItem('<dile-floating-menu-item href="/home">Home</dile-floating-menu-item>');
    expect(el.getAttribute('role')).toBe('listitem');
  });
});
