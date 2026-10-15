import { describe, it, expect, afterEach } from 'vitest';
import './input-phone.js';

describe('dile-input-phone', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function render(attributes = '') {
    document.body.innerHTML = `<dile-input-phone ${attributes}></dile-input-phone>`;
    const el = document.body.querySelector('dile-input-phone');
    await el.updateComplete;
    await el.prefixSelect?.updateComplete;
    return el;
  }

  function numberInput(el) {
    return el.shadowRoot.getElementById('textField');
  }

  async function typeNumber(el, text) {
    const input = numberInput(el);
    input.value = text;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;
  }

  async function blurNumber(el) {
    numberInput(el).dispatchEvent(new Event('blur'));
    await el.updateComplete;
    await el.prefixSelect?.updateComplete;
  }

  async function choosePrefix(el, keyword, optionText) {
    const prefixSelect = el.prefixSelect;
    const search = prefixSelect.shadowRoot.getElementById('search');
    search.value = keyword;
    search.dispatchEvent(new Event('input', { bubbles: true }));
    await wait(20);
    await prefixSelect.updateComplete;
    const option = Array.from(prefixSelect.select.shadowRoot.querySelectorAll('[role="option"]'))
      .find(o => o.textContent.trim() === optionText);
    option.click();
    await prefixSelect.select.updateComplete;
    await prefixSelect.updateComplete;
    await el.updateComplete;
  }

  describe('Rendering', () => {
    it('renders the prefix selector and a tel input', async () => {
      const el = await render('label="Phone"');

      expect(el.prefixSelect).toBeTruthy();
      const input = numberInput(el);
      expect(input.type).toBe('tel');
      expect(input.getAttribute('inputmode')).toBe('tel');
      expect(input.getAttribute('autocomplete')).toBe('tel-national');
      expect(el.shadowRoot.querySelector('label').textContent).toBe('Phone');
    });

    it('does not render the prefix selector with noPrefix', async () => {
      const el = await render('noPrefix');

      expect(el.prefixSelect).toBeNull();
      expect(numberInput(el).getAttribute('autocomplete')).toBe('tel');
    });

    it('preselects the prefix of the country attribute', async () => {
      const el = await render('country="ES"');

      expect(el.prefix).toBe('+34');
      expect(el.prefixSelect.value).toBe('+34');
      // Compact: only the prefix once selected, to leave room for the number
      expect(el.prefixSelect.selectedText).toBe('+34');
    });

    it('screen readers get the country of the compact prefix', async () => {
      const el = await render('country="ES"');
      const input = el.prefixSelect.shadowRoot.getElementById('result').shadowRoot.querySelector('input');

      expect(input.getAttribute('aria-label')).toBe('+34 Spain');
    });

    it('lets the prefix list be wider than the narrow prefix box', async () => {
      const el = await render();
      const overlay = el.prefixSelect.select.shadowRoot.getElementById('overlay');

      expect(getComputedStyle(overlay).minWidth).toBe('256px');
    });

    it('passes language to the prefix selector, with a short placeholder', async () => {
      const el = await render('language="es"');

      expect(el.prefixSelect.language).toBe('es');
      expect(el.prefixSelect.shadowRoot.getElementById('search').placeholder).toBe('Prefijo');
    });
  });

  describe('Value with prefix', () => {
    it('combines the selected prefix and the typed number in E.164 format', async () => {
      const el = await render('country="ES" name="phone"');
      let detail = null;
      el.addEventListener('element-changed', (e) => { detail = e.detail; });

      await typeNumber(el, '600 12 34 56');

      expect(el.value).toBe('+34600123456');
      expect(el.number).toBe('600123456');
      expect(detail).toEqual({ name: 'phone', value: '+34600123456' });
      // The field keeps what the user typed
      expect(numberInput(el).value).toBe('600 12 34 56');
    });

    it('updates the value when the user chooses a prefix', async () => {
      const el = await render();
      await typeNumber(el, '612345678');
      expect(el.value).toBe('612345678');

      await choosePrefix(el, 'portugal', '+351 Portugal');

      expect(el.country).toBe('PT');
      expect(el.value).toBe('+351612345678');
    });

    it('does not let the prefix selector events escape as the field own events', async () => {
      const el = await render();
      const names = [];
      el.addEventListener('element-changed', (e) => names.push(e.detail.name));
      document.body.addEventListener('dile-phone-prefix-changed', () => names.push('leaked'));

      await choosePrefix(el, 'spain', '+34 Spain');

      expect(names.includes('leaked')).toBe(false);
      expect(names.every(name => name === el.name)).toBe(true);
    });

    it('accepts a full international number typed in the field and moves the prefix to the selector on blur', async () => {
      const el = await render();

      await typeNumber(el, '+44 7700 900123');
      expect(el.value).toBe('+447700900123');

      await blurNumber(el);

      expect(el.country).toBe('GB');
      expect(numberInput(el).value).toBe('7700900123');
      expect(el.value).toBe('+447700900123');
      expect(el.prefixSelect.value).toBe('+44');
    });

    it('understands the 00 international prefix', async () => {
      const el = await render();

      await typeNumber(el, '0034600123456');

      expect(el.value).toBe('+34600123456');
    });

    it('removes characters that are not used in phone numbers', async () => {
      const el = await render('country="ES"');

      await typeNumber(el, '600abc123');

      expect(numberInput(el).value).toBe('600123');
      expect(el.value).toBe('+34600123');
    });

    it('a country set from outside changes the prefix of the typed number', async () => {
      const el = await render('country="ES"');
      await typeNumber(el, '600123456');

      el.country = 'FR';
      await el.updateComplete;

      expect(el.value).toBe('+33600123456');
    });
  });

  describe('Value set from outside', () => {
    it('splits an initial international value into prefix and number', async () => {
      const el = await render('value="+34600123456"');

      expect(el.country).toBe('ES');
      expect(el.prefix).toBe('+34');
      expect(numberInput(el).value).toBe('600123456');
      expect(el.prefixSelect.value).toBe('+34');
      expect(el.value).toBe('+34600123456');
    });

    it('keeps the country when it shares the prefix of the value', async () => {
      const el = await render('value="+15145550199" country="CA"');

      expect(el.country).toBe('CA');
      expect(el.prefixSelect.selectedText).toBe('+1');
    });

    it('uses the main country of a shared prefix', async () => {
      const el = await render('value="+15555550199"');

      expect(el.country).toBe('US');
    });

    it('keeps an unknown or national value as typed, without rewriting it', async () => {
      const el = await render('country="ES" value="600123456"');

      expect(numberInput(el).value).toBe('600123456');
      expect(el.value).toBe('600123456');
    });

    it('parses values set later, as DileForm does', async () => {
      const el = await render();

      el.value = '+351912345678';
      await el.updateComplete;

      expect(el.country).toBe('PT');
      expect(numberInput(el).value).toBe('912345678');
    });

    it('clear() empties the number and restores the initial country', async () => {
      const el = await render('country="ES"');
      el.value = '+447700900123';
      await el.updateComplete;
      expect(el.country).toBe('GB');

      el.clear();
      await el.updateComplete;

      expect(el.value).toBe('');
      expect(numberInput(el).value).toBe('');
      expect(el.country).toBe('ES');

      // A value set after clear() is still parsed
      el.value = '+33612345678';
      await el.updateComplete;
      expect(el.country).toBe('FR');
    });

    it('clearing the value removes the prefix when there was no initial country', async () => {
      const el = await render('value="+34600123456"');

      el.clear();
      await el.updateComplete;
      await el.prefixSelect.updateComplete;

      expect(el.country).toBeUndefined();
      expect(el.prefixSelect.value).toBeUndefined();
    });
  });

  describe('noPrefix', () => {
    it('the value is the typed number without separators', async () => {
      const el = await render('noPrefix');

      await typeNumber(el, '(600) 12-34-56');

      expect(el.value).toBe('600123456');
      expect(el.prefix).toBeUndefined();
    });

    it('keeps an international number typed by the user', async () => {
      const el = await render('noPrefix');

      await typeNumber(el, '+34 600 123 456');

      expect(el.value).toBe('+34600123456');
    });

    it('shows a value set from outside as is', async () => {
      const el = await render('noPrefix value="+34600123456"');

      expect(numberInput(el).value).toBe('+34600123456');
    });
  });

  describe('isValid()', () => {
    it('an empty value is valid', async () => {
      const el = await render();
      expect(el.isValid()).toBe(true);
    });

    it('with prefix requires an international number', async () => {
      const el = await render();

      await typeNumber(el, '600123456');
      expect(el.isValid()).toBe(false);

      el.country = 'ES';
      await el.updateComplete;
      expect(el.isValid()).toBe(true);
    });

    it('rejects too short or too long numbers', async () => {
      const el = await render('country="ES"');

      await typeNumber(el, '12');
      expect(el.isValid()).toBe(false);

      await typeNumber(el, '1234567890123456');
      expect(el.isValid()).toBe(false);
    });

    it('without prefix checks only the length', async () => {
      const el = await render('noPrefix');

      await typeNumber(el, '600123456');
      expect(el.isValid()).toBe(true);

      await typeNumber(el, '12');
      expect(el.isValid()).toBe(false);
    });
  });

  describe('States and forms', () => {
    it('applies errored and disabled to the prefix selector and the input', async () => {
      const el = await render('errored disabled message="Wrong phone"');

      expect(el.prefixSelect.errored).toBe(true);
      expect(el.prefixSelect.disabled).toBe(true);
      expect(numberInput(el).disabled).toBe(true);
      expect(el.shadowRoot.querySelector('.message').textContent.trim()).toBe('Wrong phone');
    });

    it('hideErrorOnInput clears the error when typing', async () => {
      const el = await render('errored message="Wrong phone" hideErrorOnInput');

      await typeNumber(el, '6');

      expect(el.errored).toBe(false);
      expect(el.message).toBe('');
    });

    it('is form-associated with the full number as form value', async () => {
      document.body.innerHTML = '<form><dile-input-phone name="phone" value="+34600123456"></dile-input-phone></form>';
      const el = document.body.querySelector('dile-input-phone');
      await el.updateComplete;

      expect(new FormData(document.body.querySelector('form')).get('phone')).toBe('+34600123456');
    });
  });
});
