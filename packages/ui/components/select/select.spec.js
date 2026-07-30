import { describe, it, expect, afterEach } from 'vitest';
import './select.js';

describe('dile-select', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderSelect(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-select');
    await el.updateComplete;
    return el;
  }

  describe('Rendering', () => {
    it('renders with slotted native select element', async () => {
      const el = await renderSelect(`
        <dile-select>
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </dile-select>
      `);

      expect(el.querySelector('select')).toBeTruthy();
      expect(el.querySelector('select').getAttribute('slot')).toBe('select');
    });

    it('renders with a label when provided', async () => {
      const el = await renderSelect(`
        <dile-select label="Choose option">
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select>
      `);

      const label = el.shadowRoot.querySelector('label');
      expect(label).toBeTruthy();
      expect(label.textContent).toBe('Choose option');
    });

    it('does not render label when not provided', async () => {
      const el = await renderSelect(`
        <dile-select>
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select>
      `);

      expect(el.shadowRoot.querySelector('label')).toBeNull();
    });

    it('renders an arrow icon inside select-wrapper', async () => {
      const el = await renderSelect(`
        <dile-select>
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select>
      `);

      const arrowIcon = el.shadowRoot.querySelector('.arrow-icon');
      expect(arrowIcon).toBeTruthy();
      expect(arrowIcon.querySelector('svg')).toBeTruthy();
    });

    it('renders message when provided', async () => {
      const el = await renderSelect(`
        <dile-select message="This is a message">
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select>
      `);

      const message = el.shadowRoot.querySelector('.message');
      expect(message).toBeTruthy();
      expect(message.textContent.trim()).toBe('This is a message');
    });

    it('applies errored-msg class to message when errored is true', async () => {
      const el = await renderSelect(`
        <dile-select errored message="Error message">
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select>
      `);

      const message = el.shadowRoot.querySelector('.message');
      expect(message.classList.contains('errored-msg')).toBe(true);
    });
  });

  describe('Properties', () => {
    it('reflects value property to the native select', async () => {
      const el = await renderSelect(`
        <dile-select value="2">
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </dile-select>
      `);

      expect(el.value).toBe('2');
      expect(el.querySelector('select').value).toBe('2');
    });

    it('updates select value when value property changes', async () => {
      const el = await renderSelect(`
        <dile-select>
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </dile-select>
      `);

      el.value = '2';
      await el.updateComplete;

      expect(el.querySelector('select').value).toBe('2');
    });

    it('reflects disabled property to native select', async () => {
      const el = await renderSelect(`
        <dile-select disabled>
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select>
      `);

      expect(el.querySelector('select').disabled).toBe(true);
      expect(el.querySelector('select').classList.contains('disabled')).toBe(true);
    });

    it('updates disabled state dynamically', async () => {
      const el = await renderSelect(`
        <dile-select>
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select>
      `);

      expect(el.querySelector('select').disabled).toBe(false);

      el.disabled = true;
      await el.updateComplete;

      expect(el.querySelector('select').disabled).toBe(true);
      expect(el.querySelector('select').classList.contains('disabled')).toBe(true);
    });

    it('applies errored class to select when errored is true', async () => {
      const el = await renderSelect(`
        <dile-select errored>
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select>
      `);

      expect(el.querySelector('select').classList.contains('errored')).toBe(true);
    });

    it('removes errored class when errored is set to false', async () => {
      const el = await renderSelect(`
        <dile-select errored>
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select>
      `);

      el.errored = false;
      await el.updateComplete;

      expect(el.querySelector('select').classList.contains('errored')).toBe(false);
    });
  });

  describe('Accessibility Attributes', () => {
    it('generates unique ID for label association', async () => {
      const el = await renderSelect(`
        <dile-select label="Select option">
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select>
      `);

      const label = el.shadowRoot.querySelector('label');
      const selectId = el.querySelector('select').id;

      expect(selectId).toMatch(/^dile-select-/);
      expect(label.getAttribute('for')).toBe(selectId);
    });

    it('assigns ID to slotted select element', async () => {
      const el = await renderSelect(`
        <dile-select>
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select>
      `);

      expect(el.querySelector('select').id).toMatch(/^dile-select-/);
    });

    it('preserves existing ID on select element', async () => {
      const el = await renderSelect(`
        <dile-select>
          <select slot="select" id="my-custom-id">
            <option value="1">Option 1</option>
          </select>
        </dile-select>
      `);

      expect(el.querySelector('select').id).toBe('my-custom-id');
    });

    it('sets aria-invalid="true" when errored is true', async () => {
      const el = await renderSelect(`
        <dile-select errored>
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select>
      `);

      expect(el.querySelector('select').getAttribute('aria-invalid')).toBe('true');
    });

    it('sets aria-invalid="false" when errored is false', async () => {
      const el = await renderSelect(`
        <dile-select>
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select>
      `);

      expect(el.querySelector('select').getAttribute('aria-invalid')).toBe('false');
    });

    it('sets aria-describedby when message exists', async () => {
      const el = await renderSelect(`
        <dile-select message="Error message">
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select>
      `);

      const messageId = el.shadowRoot.querySelector('.message').id;
      expect(el.querySelector('select').getAttribute('aria-describedby')).toBe(messageId);
    });

    it('removes aria-describedby when message is cleared', async () => {
      const el = await renderSelect(`
        <dile-select message="Error message">
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select>
      `);

      el.message = '';
      await el.updateComplete;

      expect(el.querySelector('select').hasAttribute('aria-describedby')).toBe(false);
    });

    it('sets aria-disabled attribute when disabled', async () => {
      const el = await renderSelect(`
        <dile-select disabled>
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select>
      `);

      expect(el.querySelector('select').getAttribute('aria-disabled')).toBe('true');
    });

    it('has aria-hidden on arrow icon', async () => {
      const el = await renderSelect(`
        <dile-select>
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select>
      `);

      const arrowIcon = el.shadowRoot.querySelector('.arrow-icon');
      expect(arrowIcon.getAttribute('aria-hidden')).toBe('true');
    });

    it('sets message as role="status" with aria-live="polite"', async () => {
      const el = await renderSelect(`
        <dile-select message="Message">
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select>
      `);

      const message = el.shadowRoot.querySelector('.message');
      expect(message.getAttribute('role')).toBe('status');
      expect(message.getAttribute('aria-live')).toBe('polite');
    });
  });

  describe('Events', () => {
    it('dispatches element-changed event on value change', async () => {
      const el = await renderSelect(`
        <dile-select>
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </dile-select>
      `);

      let eventFired = false;
      let eventDetail = null;
      el.addEventListener('element-changed', (e) => {
        eventFired = true;
        eventDetail = e.detail;
      });

      el.querySelector('select').value = '2';
      el.querySelector('select').dispatchEvent(new Event('change', { bubbles: true }));
      await el.updateComplete;

      expect(eventFired).toBe(true);
      expect(eventDetail.value).toBe('2');
    });

    it('does not dispatch element-changed on quietChange', async () => {
      const el = await renderSelect(`
        <dile-select value="1">
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </dile-select>
      `);

      let eventCount = 0;
      el.addEventListener('element-changed', () => {
        eventCount++;
      });

      el.quietChange('2');
      await el.updateComplete;

      expect(el.value).toBe('2');
      expect(eventCount).toBe(0);
    });
  });

  describe('Methods', () => {
    it('clear() sets value to undefined', async () => {
      const el = await renderSelect(`
        <dile-select value="1">
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </dile-select>
      `);

      el.clear();
      await el.updateComplete;

      expect(el.value).toBeUndefined();
      expect(el.querySelector('select').value).toBe('');
    });

    it('getOptionByValue() returns the correct option', async () => {
      const el = await renderSelect(`
        <dile-select>
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
        </dile-select>
      `);

      const option = el.getOptionByValue('2');
      expect(option).toBeTruthy();
      expect(option.value).toBe('2');
      expect(option.textContent).toBe('Option 2');
    });

    it('getOptionByValue() returns undefined for non-existent value', async () => {
      const el = await renderSelect(`
        <dile-select>
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select>
      `);

      const option = el.getOptionByValue('999');
      expect(option).toBeUndefined();
    });

    it('quietChange() updates value without emitting event', async () => {
      const el = await renderSelect(`
        <dile-select value="1">
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </dile-select>
      `);

      let eventCount = 0;
      el.addEventListener('element-changed', () => {
        eventCount++;
      });

      el.quietChange('2');
      await el.updateComplete;

      expect(el.value).toBe('2');
      expect(el.querySelector('select').value).toBe('2');
      expect(eventCount).toBe(0);
    });
  });

  describe('hideErrorOnInput', () => {
    it('clears error message when value changes with hideErrorOnInput', async () => {
      const el = await renderSelect(`
        <dile-select errored message="Error" hideErrorOnInput>
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </dile-select>
      `);

      expect(el.errored).toBe(true);
      expect(el.message).toBe('Error');

      el.querySelector('select').value = '2';
      el.querySelector('select').dispatchEvent(new Event('change', { bubbles: true }));
      await el.updateComplete;

      expect(el.errored).toBe(false);
      expect(el.message).toBe('');
    });

    it('does not clear error when hideErrorOnInput is false', async () => {
      const el = await renderSelect(`
        <dile-select errored message="Error">
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </dile-select>
      `);

      el.querySelector('select').value = '2';
      el.querySelector('select').dispatchEvent(new Event('change', { bubbles: true }));
      await el.updateComplete;

      expect(el.errored).toBe(true);
      expect(el.message).toBe('Error');
    });
  });

  describe('quietOnStart', () => {
    it('does not emit element-changed on initialization with quietOnStart', async () => {
      let eventCount = 0;
      document.body.innerHTML = `
        <dile-select value="1" quietOnStart>
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </dile-select>
      `;
      const el = document.body.querySelector('dile-select');
      el.addEventListener('element-changed', () => {
        eventCount++;
      });

      await el.updateComplete;

      // Initial setup should not emit event
      expect(eventCount).toBe(0);
    });
  });

  describe('Form Association', () => {
    it('is form-associated', async () => {
      const el = await renderSelect(`
        <dile-select>
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select>
      `);

      expect(el.internals).toBeTruthy();
    });

    it('sets form value through ElementInternals', async () => {
      const el = await renderSelect(`
        <dile-select value="1">
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select>
      `);

      el.value = '1';
      await el.updateComplete;

      expect(el.internals.form).toBeDefined();
    });
  });
});
