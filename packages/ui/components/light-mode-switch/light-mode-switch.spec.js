import { describe, it, expect, afterEach } from 'vitest';
import './light-mode-switch.js';

describe('dile-light-mode-switch', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    localStorage.removeItem('dile_light_mode_switch_state');
    document.documentElement.classList.remove('dark-theme');
  });

  async function renderLightModeSwitch(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-light-mode-switch');
    await el.updateComplete;
    return el;
  }

  it('renders an icon and a switch', async () => {
    const el = await renderLightModeSwitch('<dile-light-mode-switch></dile-light-mode-switch>');
    expect(el.shadowRoot.querySelector('dile-icon')).toBeTruthy();
    expect(el.shadowRoot.querySelector('dile-switch')).toBeTruthy();
  });

  it('toggles darkMode and reflects the attribute', async () => {
    const el = await renderLightModeSwitch('<dile-light-mode-switch></dile-light-mode-switch>');
    const initial = el.darkMode;

    el.toggle();
    await el.updateComplete;

    expect(el.darkMode).toBe(!initial);
    expect(el.hasAttribute('darkMode')).toBe(!initial);
  });
});
