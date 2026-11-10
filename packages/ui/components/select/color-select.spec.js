import { describe, it, expect, afterEach } from 'vitest';
import './color-select.js';

const COLORS = [
  { value: '#fecaca', name: 'Red' },
  { value: '#bbf7d0', name: 'Green' },
  { value: '#bfdbfe', name: 'Blue' },
];

describe('dile-color-select', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderColorSelect(attributes = '', colors = COLORS) {
    document.body.innerHTML = `<dile-color-select name="color" ${attributes}></dile-color-select>`;
    const el = document.body.querySelector('dile-color-select');
    el.colors = colors;
    await el.updateComplete;
    return el;
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function open(el) {
    el.shadowRoot.getElementById('trigger').click();
    await wait(100);
    await el.updateComplete;
  }

  const options = (el) => [...el.shadowRoot.querySelectorAll('[role="option"]')];
  const swatchColor = (node) => getComputedStyle(node.querySelector('.swatch')).backgroundColor;

  function keydown(el, key) {
    el.shadowRoot.getElementById('trigger').dispatchEvent(
      new KeyboardEvent('keydown', { key, bubbles: true, composed: true, cancelable: true }),
    );
  }

  describe('Rendering', () => {
    it('works without a slotted <select>', async () => {
      const el = await renderColorSelect();
      expect(el.shadowRoot.getElementById('trigger').getAttribute('role')).toBe('combobox');
    });

    it('renders one option per color, with its swatch and name', async () => {
      const el = await renderColorSelect();

      const items = options(el);
      expect(items.map((item) => item.textContent.trim())).toEqual(['Red', 'Green', 'Blue']);
      expect(swatchColor(items[1])).toBe('rgb(187, 247, 208)');
    });

    it('adds a first "no color" option with emptyLabel', async () => {
      const el = await renderColorSelect('emptyLabel="No color"');

      const [empty, first] = options(el);
      expect(empty.textContent.trim()).toBe('No color');
      expect(empty.querySelector('.swatch.empty')).toBeTruthy();
      expect(first.textContent.trim()).toBe('Red');
    });

    it('shows the selected color swatch and name on the trigger', async () => {
      const el = await renderColorSelect('value="#bfdbfe"');

      const trigger = el.shadowRoot.getElementById('trigger');
      expect(trigger.textContent.trim()).toBe('Blue');
      expect(swatchColor(trigger)).toBe('rgb(191, 219, 254)');
    });

    it('shows the placeholder without swatch when no color is selected', async () => {
      const el = await renderColorSelect('placeholder="Choose a color"');

      const trigger = el.shadowRoot.getElementById('trigger');
      expect(trigger.textContent.trim()).toBe('Choose a color');
      expect(trigger.querySelector('.swatch')).toBeNull();
    });

    it('selects the "no color" option when the value is empty', async () => {
      const el = await renderColorSelect('emptyLabel="No color"');

      expect(el.shadowRoot.getElementById('trigger').textContent.trim()).toBe('No color');
      expect(options(el)[0].getAttribute('aria-selected')).toBe('true');
    });

    it('updates the options when colors change', async () => {
      const el = await renderColorSelect();
      el.colors = [{ value: '#e5e7eb', name: 'Gray' }];
      await el.updateComplete;

      expect(options(el).map((item) => item.textContent.trim())).toEqual(['Gray']);
    });
  });

  describe('Selection', () => {
    it('clicking an option sets the color value and fires element-changed', async () => {
      const el = await renderColorSelect();
      const changes = [];
      el.addEventListener('element-changed', (e) => changes.push(e.detail));
      await open(el);

      options(el)[1].click();
      await el.updateComplete;

      expect(el.value).toBe('#bbf7d0');
      expect(changes.at(-1)).toEqual({ name: 'color', value: '#bbf7d0' });
      expect(el.opened).toBe(false);
    });

    it('selects with the keyboard (ArrowDown + Enter)', async () => {
      const el = await renderColorSelect('emptyLabel="No color"');

      // The first ArrowDown opens the list and moves one option down from the current one.
      keydown(el, 'ArrowDown');
      keydown(el, 'Enter');
      await el.updateComplete;

      expect(el.value).toBe('#fecaca');
    });

    it('typeahead uses the color names', async () => {
      const el = await renderColorSelect();

      keydown(el, 'b');
      await el.updateComplete;

      expect(el.value).toBe('#bfdbfe');
    });

    it('participates in FormData with the color value', async () => {
      document.body.innerHTML = '<form><dile-color-select name="color" value="#fecaca"></dile-color-select></form>';
      const el = document.body.querySelector('dile-color-select');
      el.colors = COLORS;
      await el.updateComplete;

      expect(new FormData(document.body.querySelector('form')).get('color')).toBe('#fecaca');
    });
  });
});
