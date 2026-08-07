import { describe, it, expect, afterEach } from 'vitest';
import './switch.js';

describe('dile-switch', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderSwitch(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-switch');
    await el.updateComplete;
    return el;
  }

  it('starts unchecked by default', async () => {
    const el = await renderSwitch('<dile-switch name="notify"></dile-switch>');
    expect(el.checked).toBe(false);
    expect(el.shadowRoot.querySelector('section button')).toBeTruthy();
  });

  it('toggles checked state and dispatches dile-switch-changed', async () => {
    const el = await renderSwitch('<dile-switch name="notify"></dile-switch>');
    let detail = null;
    el.addEventListener('dile-switch-changed', (e) => { detail = e.detail; });

    el.shadowRoot.querySelector('div').click();
    await el.updateComplete;

    expect(el.checked).toBe(true);
    expect(detail).toEqual({ checked: true, name: 'notify' });
  });
});
