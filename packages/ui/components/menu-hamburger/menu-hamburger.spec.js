import { describe, it, expect, afterEach } from 'vitest';
import './menu-hamburger.js';

describe('dile-menu-hamburger', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderMenuHamburger(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-menu-hamburger');
    await el.updateComplete;
    return el;
  }

  it('renders a hamburger and a drawer, closed by default', async () => {
    const el = await renderMenuHamburger('<dile-menu-hamburger><nav slot="menu">Links</nav></dile-menu-hamburger>');
    expect(el.opened).toBe(false);
    expect(el.shadowRoot.querySelector('dile-hamburger')).toBeTruthy();
    expect(el.shadowRoot.querySelector('dile-app-drawer')).toBeTruthy();
  });

  it('opens on toggle and dispatches dile-menu-hamburger-opened', async () => {
    const el = await renderMenuHamburger('<dile-menu-hamburger><nav slot="menu">Links</nav></dile-menu-hamburger>');
    let opened = false;
    el.addEventListener('dile-menu-hamburger-opened', () => { opened = true; });

    el.toggle();
    await el.updateComplete;

    expect(el.opened).toBe(true);
    expect(opened).toBe(true);
  });
});
