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

  it('links messageError with the input while the value is invalid', async () => {
    const el = await renderInputContact('<dile-input-contact email messageError="Invalid email"></dile-input-contact>');
    const input = el.shadowRoot.querySelector('input');
    input.value = 'not-an-email';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
    await el.updateComplete;

    const message = el.shadowRoot.querySelector('.message');
    expect(message.textContent.trim()).toBe('Invalid email');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toBe(message.id);
  });

  it('reports isMail in the blur event for valid emails', async () => {
    const el = await renderInputContact('<dile-input-contact email></dile-input-contact>');
    const input = el.shadowRoot.querySelector('input');
    let detail;
    el.addEventListener('dile-input-contact-blur', (e) => { detail = e.detail; });
    input.value = 'someone@example.com';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
    expect(detail.isValid).toBe(true);
    expect(detail.isMail).toBe(true);
  });

  it('clears the error on input when hideErrorOnInput is set', async () => {
    const el = await renderInputContact('<dile-input-contact email hideErrorOnInput value="bad"></dile-input-contact>');
    expect(el.errored).toBe(true);
    const input = el.shadowRoot.querySelector('input');
    input.value = 'bad2';
    input.dispatchEvent(new Event('input'));
    await el.updateComplete;
    expect(el.errored).toBe(false);
  });
});
