import { describe, it, expect, afterEach } from 'vitest';
import './menu-overlay.js';

describe('dile-menu-overlay', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderMenuOverlay(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-menu-overlay');
    await el.updateComplete;
    return el;
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  it('renders the trigger and content slots', async () => {
    const el = await renderMenuOverlay(`
      <dile-menu-overlay>
        <button slot="trigger">Open</button>
        <div slot="content">Menu content</div>
      </dile-menu-overlay>
    `);
    expect(el.shadowRoot.getElementById('trigger')).toBeTruthy();
    expect(el.shadowRoot.getElementById('overlay')).toBeTruthy();
  });

  it('opens the overlay when the trigger is clicked', async () => {
    const el = await renderMenuOverlay(`
      <dile-menu-overlay>
        <button slot="trigger">Open</button>
        <div slot="content">Menu content</div>
      </dile-menu-overlay>
    `);

    el.shadowRoot.getElementById('trigger').click();
    await wait(100);

    expect(el.shadowRoot.getElementById('overlay').classList.contains('opened')).toBe(true);
  });
});
