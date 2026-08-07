import { describe, it, expect, afterEach } from 'vitest';
import './checkbox.js';

describe('dile-checkbox', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderCheckbox(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-checkbox');
    await el.updateComplete;
    return el;
  }

  function getControl(el) {
    return el.shadowRoot.querySelector('[role="checkbox"]');
  }

  describe('Rendering', () => {
    it('starts unchecked by default', async () => {
      const el = await renderCheckbox('<dile-checkbox name="terms"></dile-checkbox>');
      expect(el.checked).toBe(false);
      expect(getControl(el).getAttribute('aria-checked')).toBe('false');
    });

    it('renders the slotted label content', async () => {
      const el = await renderCheckbox('<dile-checkbox name="terms">Accept terms</dile-checkbox>');
      const label = el.shadowRoot.querySelector('label.label');
      expect(label).toBeTruthy();
      expect(el.textContent.trim()).toBe('Accept terms');
    });

    it('does not render a label element when there is no slotted content', async () => {
      const el = await renderCheckbox('<dile-checkbox name="terms"></dile-checkbox>');
      expect(el.shadowRoot.querySelector('label.label')).toBeNull();
    });

    it('renders a message when the message property is set', async () => {
      const el = await renderCheckbox('<dile-checkbox name="terms"></dile-checkbox>');
      el.message = 'You must accept';
      el.errored = true;
      await el.updateComplete;

      const message = el.shadowRoot.querySelector('dile-input-message');
      expect(message).toBeTruthy();
      expect(message.getAttribute('message')).toBe('You must accept');
    });
  });

  describe('Toggling', () => {
    it('toggles checked state on click', async () => {
      const el = await renderCheckbox('<dile-checkbox name="terms"></dile-checkbox>');
      el.shadowRoot.querySelector('div').click();
      await el.updateComplete;

      expect(el.checked).toBe(true);
    });

    it('toggles checked state on Space key press', async () => {
      const el = await renderCheckbox('<dile-checkbox name="terms"></dile-checkbox>');
      const control = getControl(el);
      control.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true }));
      await el.updateComplete;

      expect(el.checked).toBe(true);
    });

    it('does not toggle when disabled', async () => {
      const el = await renderCheckbox('<dile-checkbox name="terms" disabled></dile-checkbox>');
      el.shadowRoot.querySelector('div').click();
      await el.updateComplete;

      expect(el.checked).toBe(false);
    });

    it('clears the checked state via clear()', async () => {
      const el = await renderCheckbox('<dile-checkbox name="terms" checked></dile-checkbox>');
      expect(el.checked).toBe(true);

      el.clear();
      await el.updateComplete;

      expect(el.checked).toBe(false);
    });

    it('mirrors checked through the value property', async () => {
      const el = await renderCheckbox('<dile-checkbox name="terms"></dile-checkbox>');
      el.value = true;
      await el.updateComplete;

      expect(el.checked).toBe(true);
      expect(el.value).toBe(true);
    });
  });

  describe('Events', () => {
    it('dispatches dile-checkbox-changed with checked and name', async () => {
      const el = await renderCheckbox('<dile-checkbox name="terms"></dile-checkbox>');
      let detail = null;
      el.addEventListener('dile-checkbox-changed', (e) => { detail = e.detail; });

      el.shadowRoot.querySelector('div').click();
      await el.updateComplete;

      expect(detail).toEqual({ checked: true, name: 'terms' });
    });

    it('dispatches element-changed with name and value', async () => {
      const el = await renderCheckbox('<dile-checkbox name="terms"></dile-checkbox>');
      let detail = null;
      el.addEventListener('element-changed', (e) => { detail = e.detail; });

      el.shadowRoot.querySelector('div').click();
      await el.updateComplete;

      expect(detail).toEqual({ name: 'terms', value: true });
    });

    it('clears the error state on toggle when hideErrorOnInput is set', async () => {
      const el = await renderCheckbox('<dile-checkbox name="terms" hideErrorOnInput></dile-checkbox>');
      el.message = 'Required';
      el.errored = true;
      await el.updateComplete;

      el.shadowRoot.querySelector('div').click();
      await el.updateComplete;

      expect(el.message).toBe('');
      expect(el.errored).toBe(false);
    });
  });

  describe('Native form submission', () => {
    it('participates in FormData when name is set as an attribute', async () => {
      document.body.innerHTML = `
        <form id="testForm">
          <dile-checkbox name="terms" checked></dile-checkbox>
        </form>
      `;
      const el = document.body.querySelector('dile-checkbox');
      await el.updateComplete;

      const data = new FormData(document.getElementById('testForm'));
      expect(data.get('terms')).toBe('true');
    });

    it('participates in FormData when name is set as a JS property', async () => {
      document.body.innerHTML = `
        <form id="testForm">
          <dile-checkbox checked></dile-checkbox>
        </form>
      `;
      const el = document.body.querySelector('dile-checkbox');
      el.name = 'terms';
      await el.updateComplete;

      expect(el.getAttribute('name')).toBe('terms');

      const data = new FormData(document.getElementById('testForm'));
      expect(data.get('terms')).toBe('true');
    });

    it('is excluded from FormData when unchecked', async () => {
      document.body.innerHTML = `
        <form id="testForm">
          <dile-checkbox name="terms"></dile-checkbox>
        </form>
      `;
      const el = document.body.querySelector('dile-checkbox');
      await el.updateComplete;

      const data = new FormData(document.getElementById('testForm'));
      expect(data.get('terms')).toBeNull();
    });
  });

  describe('Accessibility', () => {
    it('exposes role="checkbox" on the interactive control', async () => {
      const el = await renderCheckbox('<dile-checkbox name="terms"></dile-checkbox>');
      expect(getControl(el)).toBeTruthy();
    });

    it('keeps aria-checked in sync with the checked state', async () => {
      const el = await renderCheckbox('<dile-checkbox name="terms"></dile-checkbox>');
      const control = getControl(el);
      expect(control.getAttribute('aria-checked')).toBe('false');

      el.checked = true;
      await el.updateComplete;

      expect(control.getAttribute('aria-checked')).toBe('true');
    });

    it('is keyboard focusable when enabled', async () => {
      const el = await renderCheckbox('<dile-checkbox name="terms"></dile-checkbox>');
      const control = getControl(el);
      expect(control.getAttribute('tabindex')).toBe('0');
    });

    it('is removed from the tab order and marked aria-disabled when disabled', async () => {
      const el = await renderCheckbox('<dile-checkbox name="terms" disabled></dile-checkbox>');
      const control = getControl(el);
      expect(control.getAttribute('tabindex')).toBe('-1');
      expect(control.getAttribute('aria-disabled')).toBe('true');
    });

    it('links the control to the slotted label via aria-labelledby', async () => {
      const el = await renderCheckbox('<dile-checkbox name="terms">Accept terms</dile-checkbox>');
      const control = getControl(el);
      const labelledbyId = control.getAttribute('aria-labelledby');

      expect(labelledbyId).toBeTruthy();
      expect(el.shadowRoot.getElementById(labelledbyId)).toBeTruthy();
    });

    it('does not set aria-labelledby when there is no slotted label', async () => {
      const el = await renderCheckbox('<dile-checkbox name="terms"></dile-checkbox>');
      expect(getControl(el).hasAttribute('aria-labelledby')).toBe(false);
    });

    it('links the control to the message via aria-describedby when a message is set', async () => {
      const el = await renderCheckbox('<dile-checkbox name="terms"></dile-checkbox>');
      el.message = 'Required';
      el.errored = true;
      await el.updateComplete;

      const control = getControl(el);
      const describedbyId = control.getAttribute('aria-describedby');

      expect(describedbyId).toBeTruthy();
      expect(el.shadowRoot.getElementById(describedbyId)).toBeTruthy();
    });
  });
});
