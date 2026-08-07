import { describe, it, expect, afterEach } from 'vitest';
import { closeIcon } from '@dile/icons/index.js';
import './icon-switch-group.js';
import './icon-switch.js';

describe('dile-icon-switch-group', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderGroup(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-icon-switch-group');
    const switches = el.querySelectorAll('dile-icon-switch');
    switches.forEach((s) => { s.icon = closeIcon; });
    await el.updateComplete;
    for (const s of switches) await s.updateComplete;
    return el;
  }

  it('renders the slotted dile-icon-switch children', async () => {
    const el = await renderGroup(`
      <dile-icon-switch-group>
        <dile-icon-switch name="one"></dile-icon-switch>
        <dile-icon-switch name="two"></dile-icon-switch>
      </dile-icon-switch-group>
    `);
    expect(el.querySelectorAll('dile-icon-switch').length).toBe(2);
  });

  it('deactivates the other switches when one becomes active', async () => {
    const el = await renderGroup(`
      <dile-icon-switch-group>
        <dile-icon-switch name="one" active></dile-icon-switch>
        <dile-icon-switch name="two"></dile-icon-switch>
      </dile-icon-switch-group>
    `);
    const [one, two] = el.querySelectorAll('dile-icon-switch');

    two.shadowRoot.querySelector('dile-icon').click();
    await el.updateComplete;

    expect(two.active).toBe(true);
    expect(one.active).toBe(false);
  });
});
