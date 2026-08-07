import { describe, it, expect, afterEach } from 'vitest';
import './floating-menu.js';

describe('dile-floating-menu', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderFloatingMenu(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-floating-menu');
    await el.updateComplete;
    return el;
  }

  it('renders closed by default', async () => {
    const el = await renderFloatingMenu('<dile-floating-menu></dile-floating-menu>');
    expect(el.opened).toBe(false);
    expect(el.shadowRoot.querySelector('button')).toBeTruthy();
    expect(el.shadowRoot.querySelector('.closed')).toBeTruthy();
  });

  it('toggles opened state when the button is clicked', async () => {
    const el = await renderFloatingMenu('<dile-floating-menu></dile-floating-menu>');
    el.shadowRoot.querySelector('button').click();
    await el.updateComplete;

    expect(el.opened).toBe(true);
    expect(el.shadowRoot.querySelector('.opened')).toBeTruthy();
  });
});
