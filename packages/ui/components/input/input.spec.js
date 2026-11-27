import { describe, it, expect, afterEach } from 'vitest';
import './input.js';

describe('dile-input', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderInput(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-input');
    await el.updateComplete;
    return el;
  }

  it('renders a native text input with the given value', async () => {
    const el = await renderInput('<dile-input name="first" value="hello"></dile-input>');
    const input = el.shadowRoot.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.value).toBe('hello');
  });

  it('renders the label when set', async () => {
    const el = await renderInput('<dile-input label="First name"></dile-input>');
    const label = el.shadowRoot.querySelector('label');
    expect(label).toBeTruthy();
    expect(label.textContent.trim()).toBe('First name');
  });

  it('updates the value property on user input', async () => {
    const el = await renderInput('<dile-input name="first"></dile-input>');
    const input = el.shadowRoot.querySelector('input');
    input.value = 'typed';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;

    expect(el.value).toBe('typed');
  });

  it('renders a message when the message property is set', async () => {
    const el = await renderInput('<dile-input></dile-input>');
    el.message = 'Required field';
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('.message span').textContent.trim()).toBe('Required field');
  });

  it('clearError() removes the message and the errored state', async () => {
    const el = await renderInput('<dile-input message="Required" errored></dile-input>');
    expect(el.shadowRoot.querySelector('.message').classList.contains('errored-msg')).toBe(true);
    expect(el.shadowRoot.querySelector('input').classList.contains('errored')).toBe(true);

    el.clearError();
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('.message')).toBeNull();
    expect(el.shadowRoot.querySelector('input').classList.contains('errored')).toBe(false);
  });

  describe('accessibleLabel', () => {
    it('applies accessibleLabel as aria-label when there is no label', async () => {
      const el = await renderInput('<dile-input accessiblelabel="Quantity"></dile-input>');
      const input = el.shadowRoot.querySelector('input');
      expect(input.getAttribute('aria-label')).toBe('Quantity');
    });

    it('does not set aria-label when a visible label exists', async () => {
      const el = await renderInput('<dile-input label="Quantity" accessiblelabel="Line quantity"></dile-input>');
      const input = el.shadowRoot.querySelector('input');
      const label = el.shadowRoot.querySelector('label');
      expect(input.hasAttribute('aria-label')).toBe(false);
      expect(label.getAttribute('for')).toBe(input.id);
    });

    it('removes aria-label when a label is set later', async () => {
      const el = await renderInput('<dile-input accessiblelabel="Quantity"></dile-input>');
      el.label = 'Quantity';
      await el.updateComplete;
      expect(el.shadowRoot.querySelector('input').hasAttribute('aria-label')).toBe(false);
    });
  });

  describe('null and undefined values', () => {
    it('shows an empty field for undefined or null values', async () => {
      const el = await renderInput('<dile-input value="x"></dile-input>');
      el.value = undefined;
      await el.updateComplete;
      expect(el.el.value).toBe('');
      el.value = null;
      await el.updateComplete;
      expect(el.el.value).toBe('');
    });
  });

  describe('error accessibility', () => {
    it('sets aria-invalid and links the message with aria-describedby', async () => {
      const el = await renderInput('<dile-input label="Name" errored message="Required"></dile-input>');
      const input = el.el;
      const message = el.shadowRoot.querySelector('.message');
      expect(input.getAttribute('aria-invalid')).toBe('true');
      expect(input.getAttribute('aria-describedby')).toBe(message.id);
    });

    it('describes the input with a non error message too', async () => {
      const el = await renderInput('<dile-input message="Optional field"></dile-input>');
      expect(el.el.hasAttribute('aria-invalid')).toBe(false);
      expect(el.el.getAttribute('aria-describedby')).toBe(el.shadowRoot.querySelector('.message').id);
    });

    it('removes both attributes when the error is cleared', async () => {
      const el = await renderInput('<dile-input errored message="Required"></dile-input>');
      el.clearError();
      await el.updateComplete;
      expect(el.el.hasAttribute('aria-invalid')).toBe(false);
      expect(el.el.hasAttribute('aria-describedby')).toBe(false);
    });
  });

  describe('autocomplete', () => {
    it('uses "on" by default and "off" with disableAutocomplete', async () => {
      const el = await renderInput('<dile-input></dile-input>');
      expect(el.el.getAttribute('autocomplete')).toBe('on');
      el.disableAutocomplete = true;
      await el.updateComplete;
      expect(el.el.getAttribute('autocomplete')).toBe('off');
    });

    it('applies the autocomplete property', async () => {
      const el = await renderInput('<dile-input autocomplete="email"></dile-input>');
      expect(el.el.getAttribute('autocomplete')).toBe('email');
    });
  });

  describe('form integration', () => {
    async function renderForm(html) {
      document.body.innerHTML = `<form>${html}</form>`;
      const form = document.body.querySelector('form');
      const el = form.querySelector('dile-input');
      await el.updateComplete;
      return { form, el };
    }

    it('submits its value with the form', async () => {
      const { form, el } = await renderForm('<dile-input name="first" value="hello"></dile-input>');
      expect(new FormData(form).get('first')).toBe('hello');
      el.value = 'other';
      await el.updateComplete;
      expect(new FormData(form).get('first')).toBe('other');
    });

    it('restores the value attribute and clears the error on form reset', async () => {
      const { form, el } = await renderForm('<dile-input name="first" value="initial"></dile-input>');
      el.el.value = 'typed';
      el.el.dispatchEvent(new Event('input'));
      el.errored = true;
      el.message = 'Wrong';
      await el.updateComplete;

      form.reset();
      await el.updateComplete;

      expect(el.value).toBe('initial');
      expect(el.el.value).toBe('initial');
      expect(el.errored).toBe(false);
      expect(new FormData(form).get('first')).toBe('initial');
    });

    it('resets to an empty value when there is no value attribute', async () => {
      const { form, el } = await renderForm('<dile-input name="first"></dile-input>');
      el.value = 'set by code';
      await el.updateComplete;
      form.reset();
      await el.updateComplete;
      expect(el.value).toBe('');
    });

    it('disables the native input when an ancestor fieldset is disabled', async () => {
      const { form, el } = await renderForm('<fieldset><dile-input name="first"></dile-input></fieldset>');
      const fieldset = form.querySelector('fieldset');
      fieldset.disabled = true;
      await el.updateComplete;
      expect(el.el.disabled).toBe(true);
      expect(el.disabled).toBe(false);

      fieldset.disabled = false;
      await el.updateComplete;
      expect(el.el.disabled).toBe(false);
    });
  });

  describe('focus()', () => {
    it('does not throw before the first render and focuses once rendered', async () => {
      const el = document.createElement('dile-input');
      expect(() => el.focus()).not.toThrow();
      document.body.appendChild(el);
      await el.updateComplete;
      await el.updateComplete;
      expect(el.shadowRoot.activeElement).toBe(el.el);
    });
  });
});
