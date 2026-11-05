import { describe, it, expect, afterEach } from 'vitest';
import './input-contact.js';

describe('dile-input-contact', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderInputContact(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-input-contact');
    await el.updateComplete;
    return el;
  }

  it('renders a native text input with the given value', async () => {
    const el = await renderInputContact('<dile-input-contact name="phone" value="123"></dile-input-contact>');
    const input = el.shadowRoot.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.value).toBe('123');
  });

  it('marks invalid phone values as errored on blur', async () => {
    const el = await renderInputContact('<dile-input-contact name="phone" phone value="abc"></dile-input-contact>');
    const input = el.shadowRoot.querySelector('input');
    input.dispatchEvent(new Event('blur'));
    await el.updateComplete;

    expect(el.valid).toBe(false);
    expect(el.errored).toBe(true);
  });

  describe('accessibleLabel', () => {
    it('applies accessibleLabel as aria-label when there is no label', async () => {
      const el = await renderInputContact('<dile-input-contact email accessiblelabel="Email"></dile-input-contact>');
      expect(el.shadowRoot.querySelector('input').getAttribute('aria-label')).toBe('Email');
    });

    it('does not set aria-label when a visible label exists', async () => {
      const el = await renderInputContact('<dile-input-contact email label="Email" accessiblelabel="Contact email"></dile-input-contact>');
      const input = el.shadowRoot.querySelector('input');
      expect(input.hasAttribute('aria-label')).toBe(false);
      expect(el.shadowRoot.querySelector('label').getAttribute('for')).toBe(input.id);
    });
  });
});
