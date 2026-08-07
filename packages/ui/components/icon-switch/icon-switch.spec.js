import { describe, it, expect, afterEach } from 'vitest';
import { closeIcon } from '@dile/icons/index.js';
import './icon-switch.js';

describe('dile-icon-switch', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderIconSwitch(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-icon-switch');
    el.icon = closeIcon;
    await el.updateComplete;
    return el;
  }

  it('starts inactive by default', async () => {
    const el = await renderIconSwitch('<dile-icon-switch name="one"></dile-icon-switch>');
    expect(el.active).toBeFalsy();
    expect(el.shadowRoot.querySelector('dile-icon')).toBeTruthy();
  });

  it('toggles active and dispatches dile-icon-switch-changed on click', async () => {
    const el = await renderIconSwitch('<dile-icon-switch name="one"></dile-icon-switch>');
    let detail = null;
    el.addEventListener('dile-icon-switch-changed', (e) => { detail = e.detail; });

    el.shadowRoot.querySelector('dile-icon').click();
    await el.updateComplete;

    expect(el.active).toBe(true);
    expect(detail).toEqual({ active: true, name: 'one' });
  });
});
