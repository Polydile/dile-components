import { describe, it, expect, afterEach } from 'vitest';
import './modal-help.js';

describe('dile-modal-help', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderModalHelp(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-modal-help');
    await el.updateComplete;
    return el;
  }

  it('renders a trigger button with the default label and a closed inner modal', async () => {
    const el = await renderModalHelp('<dile-modal-help>Help content</dile-modal-help>');
    const button = el.shadowRoot.querySelector('dile-button-icon');
    expect(button).toBeTruthy();
    expect(button.textContent.trim()).toBe('Help');
    expect(el.elmodal.opened).toBe(false);
  });

  it('opens the inner modal on open()', async () => {
    const el = await renderModalHelp('<dile-modal-help title="Info">Help content</dile-modal-help>');
    el.open();
    await el.elmodal.updateComplete;

    expect(el.elmodal.opened).toBe(true);
    expect(el.shadowRoot.querySelector('h1').textContent.trim()).toBe('Info');
  });
});
