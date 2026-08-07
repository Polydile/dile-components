import { describe, it, expect, afterEach } from 'vitest';
import './password.js';

describe('dile-password', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderPassword(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-password');
    await el.updateComplete;
    return el;
  }

  it('renders a password type input by default', async () => {
    const el = await renderPassword('<dile-password name="pwd"></dile-password>');
    const input = el.shadowRoot.querySelector('input');

    expect(input).toBeTruthy();
    expect(input.type).toBe('password');
  });

  it('toggles input type to text when the visibility toggle is shown and clicked', async () => {
    const el = await renderPassword('<dile-password name="pwd" showPasswordToggle></dile-password>');
    const toggle = el.shadowRoot.querySelector('.password-toggle-btn');
    expect(toggle).toBeTruthy();

    toggle.click();
    await el.updateComplete;

    expect(el.passwordVisible).toBe(true);
    expect(el.shadowRoot.querySelector('input').type).toBe('text');
  });
});
