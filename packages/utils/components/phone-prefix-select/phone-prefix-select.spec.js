import { describe, it, expect, afterEach } from 'vitest';
import './phone-prefix-select.js';

describe('dile-phone-prefix-select', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function render(attributes = '') {
    document.body.innerHTML = `<dile-phone-prefix-select ${attributes}></dile-phone-prefix-select>`;
    const el = document.body.querySelector('dile-phone-prefix-select');
    await el.updateComplete;
    return el;
  }

  async function settle(el) {
    await wait(20);
    await el.updateComplete;
  }

  async function typeKeyword(el, keyword) {
    const input = el.shadowRoot.getElementById('search');
    input.value = keyword;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await settle(el);
  }

  function visibleOptionTexts(el) {
    return Array.from(el.select.shadowRoot.querySelectorAll('[role="option"]')).map(o => o.textContent.trim());
  }

  async function selectOptionByText(el, text) {
    const option = Array.from(el.select.shadowRoot.querySelectorAll('[role="option"]'))
      .find(o => o.textContent.trim() === text);
    option.click();
    await el.select.updateComplete;
    await el.updateComplete;
  }

  describe('Rendering', () => {
    it('renders the search field without requiring a slotted select', async () => {
      const el = await render();
      expect(el.shadowRoot.getElementById('search')).toBeTruthy();
      expect(el.sourceOptions.length).toBeGreaterThan(200);
    });

    it('uses English texts by default and Spanish ones with language="es"', async () => {
      const en = await render();
      expect(en.shadowRoot.getElementById('search').placeholder).toBe('Search a country or prefix...');

      const es = await render('language="es"');
      expect(es.shadowRoot.getElementById('search').placeholder).toBe('Busca un país o prefijo...');
    });

    it('keeps a custom placeholder', async () => {
      const el = await render('language="es" placeholder="Prefijo"');
      expect(el.shadowRoot.getElementById('search').placeholder).toBe('Prefijo');
    });
  });

  describe('Searching', () => {
    it('numeric keywords match the beginning of the prefix', async () => {
      const el = await render();

      await typeKeyword(el, '35');

      const texts = visibleOptionTexts(el);
      expect(texts).toContain('Portugal (+351)');
      expect(texts).toContain('Finland (+358)');
      expect(texts.every(t => /\(\+35/.test(t))).toBe(true);
    });

    it('accepts the leading "+" in numeric keywords', async () => {
      const el = await render();

      await typeKeyword(el, '+34');

      expect(visibleOptionTexts(el)).toEqual(['Spain (+34)']);
    });

    it('text keywords match country names ignoring case and accents', async () => {
      const el = await render('language="es"');

      await typeKeyword(el, 'MEXICO');

      expect(visibleOptionTexts(el)).toEqual(['México (+52)']);
    });

    it('matches alternative names of the same country', async () => {
      const el = await render('language="es"');

      await typeKeyword(el, 'myanmar');

      expect(visibleOptionTexts(el)).toEqual(['Birmania (+95)']);
    });

    it('prefixFirst shows the prefix before the country name', async () => {
      const el = await render('prefixFirst');

      await typeKeyword(el, '+34');

      expect(visibleOptionTexts(el)).toEqual(['+34 Spain']);
    });

    it('compact shows only the prefix once selected, keeping full texts in the list', async () => {
      const el = await render('compact value="+44"');

      expect(el.selectedText).toBe('+44');
      expect(el.sourceOptions.find(o => o.value === 'GB').text).toBe('United Kingdom (+44)');
    });

    it('compact gives the selected field an accessible name with the country', async () => {
      const el = await render('compact label="Prefix" value="+44"');
      await el.updateComplete;
      const result = el.shadowRoot.getElementById('result');
      await result.updateComplete;
      const input = result.shadowRoot.querySelector('input');

      expect(input.value).toBe('+44');
      expect(input.getAttribute('aria-label')).toBe('Prefix, United Kingdom (+44)');
    });

    it('lists priority countries first', async () => {
      const el = await render('priority-countries="US|CA"');

      await typeKeyword(el, '1');

      expect(visibleOptionTexts(el).slice(0, 2)).toEqual(['United States (+1)', 'Canada (+1)']);
    });
  });

  describe('Selecting', () => {
    it('value is the prefix and country is the ISO code of the selected option', async () => {
      const el = await render('name="phone_prefix"');
      await typeKeyword(el, 'canada');

      let changedDetail = null;
      let prefixDetail = null;
      el.addEventListener('element-changed', (e) => { changedDetail = e.detail; });
      el.addEventListener('dile-phone-prefix-changed', (e) => { prefixDetail = e.detail; });

      await selectOptionByText(el, 'Canada (+1)');

      expect(el.value).toBe('+1');
      expect(el.country).toBe('CA');
      expect(el.selectedText).toBe('Canada (+1)');
      expect(changedDetail).toEqual({ name: 'phone_prefix', value: '+1' });
      expect(prefixDetail).toEqual({ value: '+1', country: 'CA' });
    });

    it('clearing the selection resets value and country', async () => {
      const el = await render();
      await typeKeyword(el, 'spain');
      await selectOptionByText(el, 'Spain (+34)');

      el.shadowRoot.getElementById('result').dispatchEvent(new CustomEvent('dile-input-search-cleared', { bubbles: true }));
      await el.updateComplete;

      expect(el.value).toBeUndefined();
      expect(el.country).toBeUndefined();
      expect(el.isSelected).toBe(false);
    });
  });

  describe('Initial value and country', () => {
    it('resolves the main country of a shared prefix', async () => {
      const el = await render('value="+1"');

      expect(el.country).toBe('US');
      expect(el.selectedText).toBe('United States (+1)');
    });

    it('uses the given country when it matches the prefix', async () => {
      const el = await render('value="+1" country="CA"');

      expect(el.country).toBe('CA');
      expect(el.selectedText).toBe('Canada (+1)');
    });

    it('ignores a country that does not match the prefix', async () => {
      const el = await render('value="+44" country="CA"');

      expect(el.country).toBe('GB');
      expect(el.value).toBe('+44');
    });

    it('accepts a prefix without "+"', async () => {
      const el = await render('value="34"');

      expect(el.country).toBe('ES');
      expect(el.selectedText).toBe('Spain (+34)');
    });

    it('setting only the country selects its prefix', async () => {
      const el = await render('country="MX"');
      await el.updateComplete;

      expect(el.value).toBe('+52');
      expect(el.isSelected).toBe(true);
      expect(el.selectedText).toBe('Mexico (+52)');
    });

    it('set() keeps the current country when it shares the new prefix', async () => {
      const el = await render('value="+1" country="CA"');

      el.set('+1');
      await el.updateComplete;
      expect(el.country).toBe('CA');

      el.set('+33');
      await el.updateComplete;
      expect(el.country).toBe('FR');
    });

    it('clear() resets value and country', async () => {
      const el = await render('value="+34"');

      el.clear();
      await el.updateComplete;

      expect(el.value).toBeUndefined();
      expect(el.country).toBeUndefined();
    });

    it('updates the selected text when the language changes', async () => {
      const el = await render('value="+34"');
      expect(el.selectedText).toBe('Spain (+34)');

      el.language = 'es';
      await el.updateComplete;

      expect(el.selectedText).toBe('España (+34)');
    });

    it('is form-associated with the prefix as form value', async () => {
      document.body.innerHTML = '<form><dile-phone-prefix-select name="prefix" value="+34"></dile-phone-prefix-select></form>';
      const el = document.body.querySelector('dile-phone-prefix-select');
      await el.updateComplete;

      expect(new FormData(document.body.querySelector('form')).get('prefix')).toBe('+34');
    });
  });
});
