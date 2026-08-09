import { describe, it, expect, afterEach, vi } from 'vitest';
import './select-overlay.js';
import '@dile/iconlib/lucide-icons/house.js';
import '@dile/iconlib/material-icons/star.js';

describe('dile-select-overlay', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderSelectOverlay(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-select-overlay');
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

  describe('Rendering', () => {
    it('renders a trigger button and a listbox overlay', async () => {
      const el = await renderSelectOverlay(`
        <dile-select-overlay>
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </dile-select-overlay>
      `);

      const trigger = el.shadowRoot.getElementById('trigger');
      const overlay = el.shadowRoot.getElementById('overlay');
      expect(trigger).toBeTruthy();
      expect(trigger.getAttribute('role')).toBe('combobox');
      expect(overlay).toBeTruthy();
      expect(overlay.getAttribute('role')).toBe('listbox');
    });

    it('shows the selected option text on the trigger', async () => {
      const el = await renderSelectOverlay(`
        <dile-select-overlay value="2">
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </dile-select-overlay>
      `);

      const trigger = el.shadowRoot.getElementById('trigger');
      expect(trigger.textContent.trim()).toBe('Option 2');
    });

    it('shows the placeholder text on the trigger when there is no matching option (e.g. mounted before options load)', async () => {
      const el = await renderSelectOverlay(`
        <dile-select-overlay placeholder="Choose one...">
          <select slot="select"></select>
        </dile-select-overlay>
      `);

      const triggerText = el.shadowRoot.querySelector('.trigger-text');
      expect(triggerText.textContent.trim()).toBe('Choose one...');
      expect(triggerText.classList.contains('placeholder')).toBe(true);
    });

    it('renders a label associated with the trigger', async () => {
      const el = await renderSelectOverlay(`
        <dile-select-overlay label="Choose option">
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select-overlay>
      `);

      const label = el.shadowRoot.querySelector('label');
      expect(label).toBeTruthy();
      expect(label.textContent).toBe('Choose option');
      expect(label.getAttribute('for')).toBe('trigger');
    });

    it('renders one option item per native option', async () => {
      const el = await renderSelectOverlay(`
        <dile-select-overlay>
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
        </dile-select-overlay>
      `);

      const items = el.shadowRoot.querySelectorAll('[role="option"]');
      expect(items.length).toBe(3);
    });

    it('picks up options added to the native select after connection', async () => {
      const el = await renderSelectOverlay(`
        <dile-select-overlay>
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select-overlay>
      `);

      const option = document.createElement('option');
      option.value = '2';
      option.textContent = 'Option 2';
      el.querySelector('select').appendChild(option);
      await wait(0);
      await el.updateComplete;

      const items = el.shadowRoot.querySelectorAll('[role="option"]');
      expect(items.length).toBe(2);
    });

    it('recomputes position when the option list changes while open (e.g. a search narrowing the results)', async () => {
      // Regression test: DileOverlay only repositions on open/scroll/resize. Without also
      // repositioning when the option count changes, a popup that flipped above the trigger
      // for a tall list stayed anchored at that old top position once it shrank, leaving it
      // floating detached from the trigger instead of hugging it.
      const el = await renderSelectOverlay(`
        <dile-select-overlay>
          <select id="manyOptions" slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select-overlay>
      `);

      const select = el.querySelector('select');
      for (let i = 2; i <= 10; i++) {
        const option = document.createElement('option');
        option.value = String(i);
        option.textContent = `Option ${i}`;
        select.appendChild(option);
      }
      await open(el);

      const updatePositionSpy = vi.spyOn(el, 'updatePosition');

      // Narrow down to a single option, same as a search field going from many results to one.
      select.innerHTML = '<option value="1">Option 1</option>';
      await wait(0);
      await el.updateComplete;

      expect(updatePositionSpy).toHaveBeenCalled();
    });
  });

  describe('Icons', () => {
    it("shows the selected option's icon on the trigger, marked aria-hidden", async () => {
      const el = await renderSelectOverlay(`
        <dile-select-overlay value="2">
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2" data-icon="lucide.house">Option 2</option>
          </select>
        </dile-select-overlay>
      `);

      const icon = el.shadowRoot.querySelector('.trigger-text dile-iconlib');
      expect(icon).toBeTruthy();
      expect(icon.getAttribute('icon')).toBe('lucide.house');
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });

    it("does not show an icon on the trigger when the selected option has none", async () => {
      const el = await renderSelectOverlay(`
        <dile-select-overlay value="1">
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2" data-icon="lucide.house">Option 2</option>
          </select>
        </dile-select-overlay>
      `);

      expect(el.shadowRoot.querySelector('.trigger-text dile-iconlib')).toBeNull();
    });

    it("shows each option's icon in the listbox, keeping the option text as its accessible name", async () => {
      const el = await renderSelectOverlay(`
        <dile-select-overlay>
          <select slot="select">
            <option value="1" data-icon="lucide.house">Option 1</option>
            <option value="2" data-icon="material.star">Option 2</option>
            <option value="3">Option 3</option>
          </select>
        </dile-select-overlay>
      `);

      await open(el);
      const items = el.shadowRoot.querySelectorAll('[role="option"]');
      expect(items[0].querySelector('dile-iconlib').getAttribute('icon')).toBe('lucide.house');
      expect(items[0].textContent.trim()).toBe('Option 1');
      expect(items[1].querySelector('dile-iconlib').getAttribute('icon')).toBe('material.star');
      expect(items[2].querySelector('dile-iconlib')).toBeNull();
    });

    it('uses data-icon on the <select> as the default icon for options that do not declare their own', async () => {
      const el = await renderSelectOverlay(`
        <dile-select-overlay value="2">
          <select slot="select" data-icon="lucide.house">
            <option value="1">Option 1</option>
            <option value="2" data-icon="material.star">Option 2</option>
          </select>
        </dile-select-overlay>
      `);

      await open(el);
      const items = el.shadowRoot.querySelectorAll('[role="option"]');
      // Option 1 has no icon of its own, so it falls back to the select-level default.
      expect(items[0].querySelector('dile-iconlib').getAttribute('icon')).toBe('lucide.house');
      // Option 2 declares its own icon, which takes precedence over the select-level default.
      expect(items[1].querySelector('dile-iconlib').getAttribute('icon')).toBe('material.star');
      // The trigger shows the selected option's own icon too.
      expect(el.shadowRoot.querySelector('.trigger-text dile-iconlib').getAttribute('icon')).toBe('material.star');
    });

    it('warns and skips rendering an icon that has not been imported/registered', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const el = await renderSelectOverlay(`
        <dile-select-overlay>
          <select slot="select">
            <option value="1" data-icon="lucide.this-icon-does-not-exist">Option 1</option>
          </select>
        </dile-select-overlay>
      `);

      await open(el);
      const item = el.shadowRoot.querySelector('[role="option"]');
      expect(item.querySelector('dile-iconlib')).toBeNull();
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });
  });

  describe('Opening and closing', () => {
    it('opens the listbox when the trigger is clicked', async () => {
      const el = await renderSelectOverlay(`
        <dile-select-overlay>
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </dile-select-overlay>
      `);

      await open(el);

      expect(el.shadowRoot.getElementById('overlay').classList.contains('opened')).toBe(true);
      expect(el.shadowRoot.getElementById('trigger').getAttribute('aria-expanded')).toBe('true');
    });

    it('closes the listbox on a second trigger click', async () => {
      const el = await renderSelectOverlay(`
        <dile-select-overlay>
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select-overlay>
      `);

      await open(el);
      el.shadowRoot.getElementById('trigger').click();
      await wait(600);

      expect(el.shadowRoot.getElementById('overlay').classList.contains('opened')).toBe(false);
    });

    it('closes without changing the value on Escape', async () => {
      const el = await renderSelectOverlay(`
        <dile-select-overlay value="1">
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </dile-select-overlay>
      `);

      await open(el);
      el.shadowRoot.getElementById('trigger').dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await wait(600);

      expect(el.value).toBe('1');
      expect(el.shadowRoot.getElementById('overlay').classList.contains('opened')).toBe(false);
    });

    it('stays open when reopened shortly after closing (e.g. blur then a quick refocus click)', async () => {
      // Regression test: close() schedules a 500ms timer to set display:none after the fade-out
      // transition. If that timer isn't actually cancelled by a reopen happening in the meantime,
      // it still fires later and force-hides the popup even though it's now open again — a brief
      // flicker followed by the popup disappearing.
      const el = await renderSelectOverlay(`
        <dile-select-overlay>
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </dile-select-overlay>
      `);

      await open(el);
      el.close();
      await wait(50);
      el.open();
      await wait(100);

      // Wait past the original close()'s 500ms hide-delay window.
      await wait(500);

      const overlay = el.shadowRoot.getElementById('overlay');
      expect(overlay.classList.contains('opened')).toBe(true);
      expect(overlay.style.display).toBe('block');
    });
  });

  describe('Positioning', () => {
    it('keeps the same moveTop-tightened gap when flipping above the trigger as when sitting below it', async () => {
      // Regression test: moveTop used to only tighten the gap for the normal (below) position.
      // The flip-to-above fallback used a fixed 10px margin unrelated to moveTop, so a popup
      // that fit comfortably below its trigger would visibly detach once it had to flip above.
      // A tall spacer pushes the trigger well down the page, so a forced small viewport height
      // reliably makes it not fit below without also failing to fit above (which would hit an
      // unrelated "doesn't fit either way" fallback instead of the plain flip this test targets).
      const el = await renderSelectOverlay(`
        <div style="height: 300px;"></div>
        <dile-select-overlay>
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
        </dile-select-overlay>
      `);

      const triggerTop = el.shadowRoot.getElementById('trigger').getBoundingClientRect().top;
      Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: Math.round(triggerTop + 50) });
      try {
        el.open();
        await wait(100);

        const trigger = el.shadowRoot.getElementById('trigger');
        const overlay = el.shadowRoot.getElementById('overlay');
        const gap = trigger.getBoundingClientRect().top - overlay.getBoundingClientRect().bottom;

        // Default DileOverlay margin (10px) plus this component's moveTop (-8px) should land
        // close to 2px — well under the untightened 10px default, and not overlapping (negative).
        expect(gap).toBeGreaterThanOrEqual(0);
        expect(gap).toBeLessThan(9);
      } finally {
        delete document.documentElement.clientHeight;
      }
    });
  });

  describe('Keyboard navigation', () => {
    it('ArrowDown opens the listbox and highlights the first option', async () => {
      const el = await renderSelectOverlay(`
        <dile-select-overlay>
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </dile-select-overlay>
      `);

      const trigger = el.shadowRoot.getElementById('trigger');
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      await wait(100);
      await el.updateComplete;

      expect(el.shadowRoot.getElementById('overlay').classList.contains('opened')).toBe(true);
      expect(el._activeIndex).toBeGreaterThanOrEqual(0);
      expect(el.highlightedText).toBeTruthy();
    });

    it('Enter selects the highlighted option and fires element-changed', async () => {
      const el = await renderSelectOverlay(`
        <dile-select-overlay>
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </dile-select-overlay>
      `);

      let eventDetail = null;
      el.addEventListener('element-changed', (e) => { eventDetail = e.detail; });

      const trigger = el.shadowRoot.getElementById('trigger');
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      await wait(100);
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await el.updateComplete;

      expect(el.value).toBe('2');
      expect(eventDetail.value).toBe('2');
      expect(el.shadowRoot.getElementById('overlay').classList.contains('opened')).toBe(false);
    });

    it('typeahead selects the matching option immediately while closed', async () => {
      const el = await renderSelectOverlay(`
        <dile-select-overlay>
          <select slot="select">
            <option value="1">Apple</option>
            <option value="2">Banana</option>
          </select>
        </dile-select-overlay>
      `);

      const trigger = el.shadowRoot.getElementById('trigger');
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', bubbles: true }));
      await el.updateComplete;

      expect(el.value).toBe('2');
    });
  });

  describe('Mouse selection', () => {
    it('clicking an option selects it and closes the listbox', async () => {
      const el = await renderSelectOverlay(`
        <dile-select-overlay>
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </dile-select-overlay>
      `);

      await open(el);
      const options = el.shadowRoot.querySelectorAll('[role="option"]');
      options[1].click();
      await el.updateComplete;

      expect(el.value).toBe('2');
      expect(el.shadowRoot.getElementById('overlay').classList.contains('opened')).toBe(false);
    });
  });

  describe('hideTrigger', () => {
    it('keeps the trigger out of the tab order and still opens via open()', async () => {
      const el = await renderSelectOverlay(`
        <dile-select-overlay hideTrigger>
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </dile-select-overlay>
      `);

      const trigger = el.shadowRoot.getElementById('trigger');
      expect(trigger.getAttribute('tabindex')).toBe('-1');

      el.open();
      await wait(100);

      expect(el.shadowRoot.getElementById('overlay').classList.contains('opened')).toBe(true);
    });

    it('handleExternalKeydown() drives navigation without a visible trigger', async () => {
      const el = await renderSelectOverlay(`
        <dile-select-overlay hideTrigger>
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </dile-select-overlay>
      `);

      // Starting value defaults to the first option ("1"); ArrowDown from closed
      // opens the popup and moves the highlight to the next option ("2"), matching
      // the WAI-ARIA APG "select-only combobox" Down Arrow behavior.
      el.handleExternalKeydown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await wait(100);
      el.handleExternalKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
      await el.updateComplete;

      expect(el.value).toBe('2');
    });

    it('setTriggerElement() points positioning at an external element instead of the internal trigger', async () => {
      // Regression test: a hideTrigger instance's own trigger is a zero-height point, so a
      // parent composing this component (e.g. dile-select-ajax-overlay) needs to be able to
      // anchor positioning to its own real, visible control instead — otherwise a flip-to-top
      // popup doesn't know to leave room for that control's actual height and covers it.
      const el = await renderSelectOverlay(`
        <dile-select-overlay hideTrigger>
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select-overlay>
      `);

      const external = document.createElement('div');
      document.body.appendChild(external);

      el.setTriggerElement(external);
      expect(el.trigger).toBe(external);

      el.setTriggerElement();
      expect(el.trigger).toBe(el.shadowRoot.getElementById('trigger'));
    });
  });

  describe('Methods', () => {
    it('clear() sets value to undefined', async () => {
      const el = await renderSelectOverlay(`
        <dile-select-overlay value="1">
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </dile-select-overlay>
      `);

      el.clear();
      await el.updateComplete;

      expect(el.value).toBeUndefined();
    });

    it('getOptionByValue() returns the matching native option', async () => {
      const el = await renderSelectOverlay(`
        <dile-select-overlay>
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </dile-select-overlay>
      `);

      const option = el.getOptionByValue('2');
      expect(option).toBeTruthy();
      expect(option.textContent).toBe('Option 2');
    });

    it('quietChange() updates value without emitting element-changed', async () => {
      const el = await renderSelectOverlay(`
        <dile-select-overlay value="1">
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </dile-select-overlay>
      `);

      let eventCount = 0;
      el.addEventListener('element-changed', () => { eventCount++; });

      el.quietChange('2');
      await el.updateComplete;

      expect(el.value).toBe('2');
      expect(eventCount).toBe(0);
    });
  });

  describe('Form Association', () => {
    it('is form-associated', async () => {
      const el = await renderSelectOverlay(`
        <dile-select-overlay>
          <select slot="select">
            <option value="1">Option 1</option>
          </select>
        </dile-select-overlay>
      `);

      expect(el.internals).toBeTruthy();
    });

    it('participates in FormData when name is set', async () => {
      document.body.innerHTML = `
        <form id="testForm">
          <dile-select-overlay name="fruit" value="2">
            <select slot="select">
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
          </dile-select-overlay>
        </form>
      `;
      const el = document.body.querySelector('dile-select-overlay');
      await el.updateComplete;

      const data = new FormData(document.getElementById('testForm'));
      expect(data.get('fruit')).toBe('2');
    });
  });
});
