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

  it('supports the features inherited from dile-input', async () => {
    const el = await renderPassword('<dile-password accessiblelabel="Password" readonly labelRight="!" autocomplete="new-password" errored message="Too short"></dile-password>');
    const input = el.shadowRoot.querySelector('input');
    expect(input.getAttribute('aria-label')).toBe('Password');
    expect(input.readOnly).toBe(true);
    expect(input.getAttribute('autocomplete')).toBe('new-password');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toBe(el.shadowRoot.querySelector('.message').id);
    expect(el.shadowRoot.querySelector('.labelright').textContent).toBe('!');
  });

  it('disables the toggle button when an ancestor fieldset is disabled', async () => {
    document.body.innerHTML = '<fieldset disabled><dile-password showPasswordToggle></dile-password></fieldset>';
    const el = document.body.querySelector('dile-password');
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('input').disabled).toBe(true);
    expect(el.shadowRoot.querySelector('.password-toggle-btn').disabled).toBe(true);
  });
});
