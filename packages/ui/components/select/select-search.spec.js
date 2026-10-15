import { describe, it, expect, afterEach } from 'vitest';
import './select-search.js';

describe('dile-select-search', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const OPTIONS = `
    <select slot="select">
      <option value="ES">España (+34)</option>
      <option value="PT">Portugal (+351)</option>
      <option value="BR">Brasil (+55)</option>
      <option value="FR">France (+33)</option>
    </select>
  `;

  async function renderSelectSearch(attributes = '', options = OPTIONS) {
    document.body.innerHTML = `<dile-select-search ${attributes}>${options}</dile-select-search>`;
    const el = document.body.querySelector('dile-select-search');
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

  async function selectOption(el, index) {
    el.select.shadowRoot.querySelectorAll('[role="option"]')[index].click();
    await el.select.updateComplete;
    await el.updateComplete;
  }

  describe('Rendering', () => {
    it('renders the search combobox and a label associated with it', async () => {
      const el = await renderSelectSearch('label="Prefix"');

      const input = el.shadowRoot.getElementById('search');
      expect(input.getAttribute('role')).toBe('combobox');
      const label = el.shadowRoot.querySelector('label');
      expect(label.textContent).toBe('Prefix');
      expect(label.getAttribute('for')).toBe('search');
    });

    it('throws when there is no select element in the light DOM', () => {
      const el = document.createElement('dile-select-search');
      expect(() => el.connectedCallback()).toThrow();
    });
  });

  describe('Searching', () => {
    it('filters the slotted options by text and opens the popup without waiting', async () => {
      const el = await renderSelectSearch();

      await typeKeyword(el, '3');

      expect(visibleOptionTexts(el)).toEqual(['España (+34)', 'Portugal (+351)', 'France (+33)']);
      expect(el.select.opened).toBe(true);
    });

    it('ignores case and accents', async () => {
      const el = await renderSelectSearch();

      await typeKeyword(el, 'ESPANA');

      expect(visibleOptionTexts(el)).toEqual(['España (+34)']);
    });

    it('shows the empty message when nothing matches', async () => {
      const el = await renderSelectSearch('emptyMessage="Nothing here"');

      await typeKeyword(el, 'zz');

      expect(el.shadowRoot.querySelector('.status').textContent.trim()).toBe('Nothing here');
      expect(el.select.opened).toBe(false);
    });

    it('never shows a loading spinner (filtering is local)', async () => {
      const el = await renderSelectSearch();

      const input = el.shadowRoot.getElementById('search');
      input.value = 'es';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      expect(el.loading).toBe(false);
      expect(el.shadowRoot.querySelector('dile-spinner-icon')).toBeNull();
    });

    it('can customize the matching by overriding filterOption()', async () => {
      class PrefixSelect extends customElements.get('dile-select-search') {
        filterOption(option, keyword) {
          return option.value.toLowerCase().startsWith(keyword.toLowerCase());
        }
      }
      customElements.define('test-prefix-select', PrefixSelect);
      document.body.innerHTML = `<test-prefix-select>${OPTIONS}</test-prefix-select>`;
      const el = document.body.querySelector('test-prefix-select');
      await el.updateComplete;

      await typeKeyword(el, 'p');

      expect(visibleOptionTexts(el)).toEqual(['Portugal (+351)']);
    });

    it('picks up options added to the light DOM select after mount', async () => {
      const el = await renderSelectSearch();
      const option = document.createElement('option');
      option.value = 'IT';
      option.textContent = 'Italia (+39)';
      el.querySelector('select').appendChild(option);
      await settle(el);

      await typeKeyword(el, 'ital');

      expect(visibleOptionTexts(el)).toEqual(['Italia (+39)']);
    });
  });

  describe('showAllOnFocus', () => {
    it('shows every option on focus when set', async () => {
      const el = await renderSelectSearch('showAllOnFocus');

      el.shadowRoot.getElementById('search').focus();
      await settle(el);

      expect(visibleOptionTexts(el).length).toBe(4);
      expect(el.select.opened).toBe(true);
    });

    it('shows nothing on focus by default', async () => {
      const el = await renderSelectSearch();

      el.shadowRoot.getElementById('search').focus();
      await settle(el);

      expect(visibleOptionTexts(el).length).toBe(0);
      expect(el.select.opened).toBe(false);
    });
  });

  describe('Selecting', () => {
    it('selecting an option sets value/selectedText and fires events', async () => {
      const el = await renderSelectSearch('name="prefix"');
      await typeKeyword(el, 'bra');

      let changedDetail = null;
      let selectedTextDetail = null;
      el.addEventListener('element-changed', (e) => { changedDetail = e.detail; });
      el.addEventListener('dile-select-search-selected-text-changed', (e) => { selectedTextDetail = e.detail; });

      await selectOption(el, 0);

      expect(el.value).toBe('BR');
      expect(el.selectedText).toBe('Brasil (+55)');
      expect(el.isSelected).toBe(true);
      expect(changedDetail).toEqual({ name: 'prefix', value: 'BR' });
      expect(selectedTextDetail.selectedText).toBe('Brasil (+55)');
      expect(el.shadowRoot.getElementById('result')).toBeTruthy();
    });

    it('keyboard flow (ArrowDown + Enter) selects a result', async () => {
      const el = await renderSelectSearch();
      await typeKeyword(el, 'port');

      const input = el.shadowRoot.getElementById('search');
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await el.select.updateComplete;
      await el.updateComplete;

      expect(el.value).toBe('PT');
      expect(el.isSelected).toBe(true);
    });

    it('clearing the selection returns to the search field', async () => {
      const el = await renderSelectSearch();
      await typeKeyword(el, 'bra');
      await selectOption(el, 0);

      el.shadowRoot.getElementById('result').dispatchEvent(new CustomEvent('dile-input-search-cleared', { bubbles: true }));
      await el.updateComplete;

      expect(el.isSelected).toBe(false);
      expect(el.value).toBeUndefined();
      expect(el.shadowRoot.getElementById('search')).toBeTruthy();
    });

    it('clearing with showAllOnFocus does not auto-select the first option of the remounted list', async () => {
      const el = await renderSelectSearch('showAllOnFocus');
      await typeKeyword(el, 'bra');
      await selectOption(el, 0);

      const changedValues = [];
      el.addEventListener('element-changed', (e) => { changedValues.push(e.detail.value); });

      el.shadowRoot.getElementById('result').dispatchEvent(new CustomEvent('dile-input-search-cleared', { bubbles: true }));
      await settle(el);
      await settle(el);

      expect(el.value).toBeUndefined();
      expect(el.isSelected).toBe(false);
      expect(changedValues).toEqual([undefined]);
    });
  });

  describe('Value API', () => {
    it('resolves the selected text of an initial value from the slotted options', async () => {
      const el = await renderSelectSearch('value="PT"');

      expect(el.isSelected).toBe(true);
      expect(el.selectedText).toBe('Portugal (+351)');
      expect(el.shadowRoot.getElementById('result').value).toBe('Portugal (+351)');
    });

    it('set() selects a value and resolves its text synchronously', async () => {
      const el = await renderSelectSearch();

      el.set('FR');
      await el.updateComplete;

      expect(el.value).toBe('FR');
      expect(el.selectedText).toBe('France (+33)');
      expect(el.isSelected).toBe(true);
    });

    it('clear() resets value and selection', async () => {
      const el = await renderSelectSearch('value="ES"');

      el.clear();
      await el.updateComplete;

      expect(el.value).toBeUndefined();
      expect(el.isSelected).toBe(false);
      expect(el.shadowRoot.getElementById('search')).toBeTruthy();
    });

    it('is form-associated and sets the form value', async () => {
      document.body.innerHTML = `<form><dile-select-search name="prefix" value="ES">${OPTIONS}</dile-select-search></form>`;
      const el = document.body.querySelector('dile-select-search');
      await el.updateComplete;

      const formData = new FormData(document.body.querySelector('form'));
      expect(formData.get('prefix')).toBe('ES');
    });
  });

  describe('Icons', () => {
    it('reads data-icon from options, falling back to the select data-icon', async () => {
      const el = await renderSelectSearch('', `
        <select slot="select" data-icon="lucide.globe">
          <option value="ES" data-icon="material.star">España</option>
          <option value="PT">Portugal</option>
        </select>
      `);

      expect(el.sourceOptions.map(o => o.icon)).toEqual(['material.star', 'lucide.globe']);
    });
  });
});
