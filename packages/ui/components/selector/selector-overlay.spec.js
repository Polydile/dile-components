import { describe, it, expect, afterEach } from 'vitest';
import { userEvent } from 'vitest/browser';
import './selector-overlay.js';
import './selector-item.js';
import '../modal/modal.js';

describe('dile-selector-overlay', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderSelectorOverlay(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-selector-overlay');
    await el.updateComplete;
    return el;
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  it('renders a bare rounded icon trigger with the default icon when label is empty', async () => {
    const el = await renderSelectorOverlay(`
      <dile-selector-overlay>
        <dile-selector-item>One</dile-selector-item>
        <dile-selector-item>Two</dile-selector-item>
      </dile-selector-overlay>
    `);

    const trigger = el.shadowRoot.getElementById('trigger');
    const icon = trigger.querySelector('dile-lucide-icon');
    expect(icon).toBeTruthy();
    expect(icon.getAttribute('icon')).toBe('ellipsis-vertical');
    expect(icon.hasAttribute('rounded')).toBe(true);
    // dile-lucide-icon forwards `rounded` to the inner icon it renders in its own shadow DOM
    expect(icon.shadowRoot.querySelector('[rounded]')).toBeTruthy();
    expect(trigger.querySelector('dile-lucide-badge')).toBeFalsy();
  });

  it('by default, label is shown as static text regardless of the selection', async () => {
    const el = await renderSelectorOverlay(`
      <dile-selector-overlay label="Menu" selected="0">
        <dile-selector-item>One</dile-selector-item>
        <dile-selector-item>Two</dile-selector-item>
      </dile-selector-overlay>
    `);

    const trigger = el.shadowRoot.getElementById('trigger');
    const badge = trigger.querySelector('dile-lucide-badge');
    expect(badge).toBeTruthy();
    expect(badge.textContent.trim()).toBe('Menu');
    expect(badge.getAttribute('icon')).toBe('ellipsis-vertical');
    expect(trigger.querySelector('dile-lucide-icon')).toBeFalsy();

    el.querySelectorAll('dile-selector-item')[1].shadowRoot.querySelector('button').click();
    await el.updateComplete;

    expect(trigger.querySelector('dile-lucide-badge').textContent.trim()).toBe('Menu');
  });

  it('with dynamicLabel, the trigger label follows the selected item text and updates when selection changes', async () => {
    const el = await renderSelectorOverlay(`
      <dile-selector-overlay dynamicLabel selected="1">
        <dile-selector-item>One</dile-selector-item>
        <dile-selector-item>Two</dile-selector-item>
      </dile-selector-overlay>
    `);

    const trigger = el.shadowRoot.getElementById('trigger');
    expect(trigger.querySelector('dile-lucide-badge').textContent.trim()).toBe('Two');

    el.querySelectorAll('dile-selector-item')[0].shadowRoot.querySelector('button').click();
    await el.updateComplete;

    expect(trigger.querySelector('dile-lucide-badge').textContent.trim()).toBe('One');
  });

  it('with dynamicLabel and nothing selected, label falls back to the label property', async () => {
    const el = await renderSelectorOverlay(`
      <dile-selector-overlay dynamicLabel label="Choose an option">
        <dile-selector-item>One</dile-selector-item>
        <dile-selector-item>Two</dile-selector-item>
      </dile-selector-overlay>
    `);

    const trigger = el.shadowRoot.getElementById('trigger');
    expect(trigger.querySelector('dile-lucide-badge').textContent.trim()).toBe('Choose an option');
  });

  it('uses a custom icon name when the icon property is set', async () => {
    const el = await renderSelectorOverlay(`
      <dile-selector-overlay icon="star" label="Two">
        <dile-selector-item>One</dile-selector-item>
        <dile-selector-item>Two</dile-selector-item>
      </dile-selector-overlay>
    `);

    const trigger = el.shadowRoot.getElementById('trigger');
    expect(trigger.querySelector('dile-lucide-badge').getAttribute('icon')).toBe('star');
  });

  it('opens the internal dile-menu-overlay when the trigger is clicked', async () => {
    const el = await renderSelectorOverlay(`
      <dile-selector-overlay>
        <dile-selector-item>One</dile-selector-item>
        <dile-selector-item>Two</dile-selector-item>
      </dile-selector-overlay>
    `);

    const menuOverlay = el.shadowRoot.querySelector('dile-menu-overlay');
    el.shadowRoot.getElementById('trigger').click();
    await wait(100);

    expect(menuOverlay.shadowRoot.getElementById('overlay').classList.contains('opened')).toBe(true);
  });

  it('selecting an item dispatches dile-selected-changed and closes the overlay', async () => {
    const el = await renderSelectorOverlay(`
      <dile-selector-overlay>
        <dile-selector-item>One</dile-selector-item>
        <dile-selector-item>Two</dile-selector-item>
      </dile-selector-overlay>
    `);

    const menuOverlay = el.shadowRoot.querySelector('dile-menu-overlay');
    el.shadowRoot.getElementById('trigger').click();
    await wait(100);

    let detail = null;
    el.addEventListener('dile-selected-changed', (e) => { detail = e.detail; });

    const items = el.querySelectorAll('dile-selector-item');
    items[1].shadowRoot.querySelector('button').click();
    await el.updateComplete;

    expect(detail.selected).toBe(1);
    expect(el.selected).toBe(1);
    expect(menuOverlay.shadowRoot.getElementById('overlay').classList.contains('opened')).toBe(false);
  });

  describe('keyboard', () => {
    const OPEN_DELAY = 100;

    function menuOf(el) {
      return el.shadowRoot.querySelector('dile-menu-overlay');
    }

    function isOpened(el) {
      return menuOf(el).shadowRoot.getElementById('overlay').classList.contains('opened');
    }

    function triggerOf(el) {
      return el.shadowRoot.getElementById('trigger');
    }

    function expectFocusOnTrigger(el) {
      expect(document.activeElement).toBe(el);
      expect(el.shadowRoot.activeElement).toBe(triggerOf(el));
    }

    function surrounded(html) {
      return `<button id="before">Before</button>${html}<button id="after">After</button>`;
    }

    async function pressAndWait(key) {
      await userEvent.keyboard(key);
      await wait(OPEN_DELAY);
    }

    async function renderAndFocusTrigger(html) {
      const el = await renderSelectorOverlay(surrounded(html));
      document.getElementById('before').focus();
      await userEvent.keyboard('{Tab}');
      expectFocusOnTrigger(el);
      return el;
    }

    const threeItems = `
      <dile-selector-item>One</dile-selector-item>
      <dile-selector-item>Two</dile-selector-item>
      <dile-selector-item>Three</dile-selector-item>
    `;

    it('runs the whole flow: Tab, Enter, arrows, Enter on an option, selection changed and focus returned', async () => {
      const el = await renderAndFocusTrigger(`<dile-selector-overlay selected="0">${threeItems}</dile-selector-overlay>`);
      const items = el.querySelectorAll('dile-selector-item');
      const changes = [];
      el.addEventListener('dile-selected-changed', (e) => changes.push(e.detail.selected));

      await pressAndWait('{Enter}');
      expect(isOpened(el)).toBe(true);
      expect(document.activeElement).toBe(items[0]);
      expect(changes).toEqual([]);

      await userEvent.keyboard('{ArrowDown}');
      expect(document.activeElement).toBe(items[1]);
      await userEvent.keyboard('{ArrowDown}');
      expect(document.activeElement).toBe(items[2]);
      await userEvent.keyboard('{ArrowUp}');
      expect(document.activeElement).toBe(items[1]);

      await userEvent.keyboard('{Enter}');
      await el.updateComplete;

      expect(changes).toEqual([1]);
      expect(el.selected).toBe(1);
      expect(items[1].selected).toBe(true);
      expect(items[0].selected).toBe(false);
      expect(isOpened(el)).toBe(false);
      expectFocusOnTrigger(el);
      expect(triggerOf(el).matches(':focus-visible')).toBe(true);
    });

    it('selects with Space, also when it was opened with Space', async () => {
      const el = await renderAndFocusTrigger(`<dile-selector-overlay>${threeItems}</dile-selector-overlay>`);
      const items = el.querySelectorAll('dile-selector-item');

      await pressAndWait('[Space]');
      expect(isOpened(el)).toBe(true);
      expect(document.activeElement).toBe(items[0]);
      expect(el.selected).toBeUndefined();

      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('[Space]');
      await el.updateComplete;

      expect(el.selected).toBe(1);
      expect(isOpened(el)).toBe(false);
      expectFocusOnTrigger(el);
    });

    it('closes with Escape without changing the selection and returns the focus to the trigger', async () => {
      const el = await renderAndFocusTrigger(`<dile-selector-overlay selected="1">${threeItems}</dile-selector-overlay>`);
      let changes = 0;
      el.addEventListener('dile-selected-changed', () => { changes++; });

      await pressAndWait('{Enter}');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{Escape}');
      await el.updateComplete;

      expect(isOpened(el)).toBe(false);
      expect(el.selected).toBe('1');
      expect(changes).toBe(0);
      expectFocusOnTrigger(el);
    });

    it('moves the focus to the selected option when opening', async () => {
      const el = await renderAndFocusTrigger(`<dile-selector-overlay selected="2">${threeItems}</dile-selector-overlay>`);
      await pressAndWait('{Enter}');
      expect(document.activeElement).toBe(el.querySelectorAll('dile-selector-item')[2]);
    });

    it('moves the focus to the first option when opening with nothing selected', async () => {
      const el = await renderAndFocusTrigger(`<dile-selector-overlay>${threeItems}</dile-selector-overlay>`);
      await pressAndWait('{Enter}');
      expect(document.activeElement).toBe(el.querySelectorAll('dile-selector-item')[0]);
    });

    it('moves to the first and last options with Home and End, and wraps with the arrows', async () => {
      const el = await renderAndFocusTrigger(`<dile-selector-overlay selected="1">${threeItems}</dile-selector-overlay>`);
      const items = el.querySelectorAll('dile-selector-item');
      await pressAndWait('{Enter}');

      await userEvent.keyboard('{End}');
      expect(document.activeElement).toBe(items[2]);
      await userEvent.keyboard('{ArrowDown}');
      expect(document.activeElement).toBe(items[0]);
      await userEvent.keyboard('{ArrowUp}');
      expect(document.activeElement).toBe(items[2]);
      await userEvent.keyboard('{Home}');
      expect(document.activeElement).toBe(items[0]);
    });

    it('skips the hidden options and the children that are not options', async () => {
      const el = await renderAndFocusTrigger(`
        <dile-selector-overlay>
          <dile-selector-item>One</dile-selector-item>
          <hr>
          <dile-selector-item style="display: none">Hidden</dile-selector-item>
          <dile-selector-item>Three</dile-selector-item>
        </dile-selector-overlay>
      `);
      const items = el.querySelectorAll('dile-selector-item');
      await pressAndWait('{Enter}');
      expect(document.activeElement).toBe(items[0]);
      await userEvent.keyboard('{ArrowDown}');
      expect(document.activeElement).toBe(items[2]);
    });

    it('closes with Tab and moves the focus to the next element of the page', async () => {
      const el = await renderAndFocusTrigger(`<dile-selector-overlay>${threeItems}</dile-selector-overlay>`);
      await pressAndWait('{Enter}');
      await userEvent.keyboard('{Tab}');
      await el.updateComplete;

      expect(isOpened(el)).toBe(false);
      expect(document.activeElement).toBe(document.getElementById('after'));
    });

    it('closes with Shift+Tab and moves the focus to the previous element of the page', async () => {
      const el = await renderAndFocusTrigger(`<dile-selector-overlay>${threeItems}</dile-selector-overlay>`);
      await pressAndWait('{Enter}');
      await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
      await el.updateComplete;

      expect(isOpened(el)).toBe(false);
      expect(document.activeElement).toBe(document.getElementById('before'));
    });

    it('leaves the options out of the tab sequence during the closing animation', async () => {
      const el = await renderAndFocusTrigger(`<dile-selector-overlay>${threeItems}</dile-selector-overlay>`);
      await pressAndWait('{Enter}');
      await userEvent.keyboard('{Escape}');
      await userEvent.keyboard('{Tab}');
      expect(document.activeElement).toBe(document.getElementById('after'));
    });

    // userEvent.keyboard() releases the keys at the end of each call, so the auto-repeat is simulated.
    it('ignores the auto-repeat of the key that opened the menu, on the trigger and on the option', async () => {
      const el = await renderAndFocusTrigger(`<dile-selector-overlay>${threeItems}</dile-selector-overlay>`);
      const repeatedEnter = () => new KeyboardEvent('keydown', { key: 'Enter', repeat: true, bubbles: true, composed: true, cancelable: true });
      const onTrigger = repeatedEnter();
      triggerOf(el).dispatchEvent(onTrigger);
      await wait(OPEN_DELAY);
      expect(onTrigger.defaultPrevented).toBe(true);
      expect(isOpened(el)).toBe(false);

      await pressAndWait('{Enter}');
      const onOption = repeatedEnter();
      el.querySelector('dile-selector-item').shadowRoot.querySelector('button').dispatchEvent(onOption);
      expect(onOption.defaultPrevented).toBe(true);
      expect(isOpened(el)).toBe(true);
    });

    it('does not activate the option that receives the focus when the opening key is released', async () => {
      const el = await renderAndFocusTrigger(`<dile-selector-overlay>${threeItems}</dile-selector-overlay>`);
      let changes = 0;
      el.addEventListener('dile-selected-changed', () => { changes++; });

      await userEvent.keyboard('{Enter>}');
      await wait(OPEN_DELAY);
      await userEvent.keyboard('{/Enter}');

      expect(changes).toBe(0);
      expect(isOpened(el)).toBe(true);
    });

    it('keeps aria-expanded in sync, keeping aria-haspopup', async () => {
      const el = await renderAndFocusTrigger(`<dile-selector-overlay>${threeItems}</dile-selector-overlay>`);
      const trigger = triggerOf(el);
      const items = el.querySelectorAll('dile-selector-item');
      expect(trigger.getAttribute('aria-haspopup')).toBe('true');
      expect(trigger.getAttribute('aria-expanded')).toBe('false');

      await pressAndWait('{Enter}');
      expect(trigger.getAttribute('aria-expanded')).toBe('true');

      await userEvent.keyboard('{Escape}');
      await el.updateComplete;
      expect(trigger.getAttribute('aria-expanded')).toBe('false');

      await pressAndWait('{Enter}');
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
      await userEvent.keyboard('{Enter}');
      await el.updateComplete;
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      expect(items[0].selected).toBe(true);

      trigger.click();
      await wait(OPEN_DELAY);
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
      document.body.click();
      await el.updateComplete;
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });

    it('exposes the popup as a menu of menu items, marking the selected one', async () => {
      const el = await renderSelectorOverlay(`<dile-selector-overlay selected="1">${threeItems}</dile-selector-overlay>`);
      const items = el.querySelectorAll('dile-selector-item');
      await wait(0);
      await items[1].updateComplete;

      const menu = el.shadowRoot.querySelector('[role="menu"]');
      expect(menu.getAttribute('aria-labelledby')).toBe('trigger');
      const control = items[1].shadowRoot.querySelector('button');
      expect(control.getAttribute('role')).toBe('menuitem');
      expect(control.getAttribute('aria-current')).toBe('true');
      expect(items[0].shadowRoot.querySelector('button').hasAttribute('aria-current')).toBe(false);
    });

    it('builds the accessible name with the label text and the configurable triggerAriaLabel', async () => {
      const el = await renderSelectorOverlay(`<dile-selector-overlay>${threeItems}</dile-selector-overlay>`);
      const trigger = triggerOf(el);
      expect(trigger.getAttribute('aria-label')).toBe('Options');

      el.triggerAriaLabel = 'Opciones';
      await el.updateComplete;
      expect(trigger.getAttribute('aria-label')).toBe('Opciones');

      el.label = 'Idioma';
      await el.updateComplete;
      expect(trigger.getAttribute('aria-label')).toBe('Idioma, Opciones');

      el.triggerAriaLabel = 'Idioma';
      await el.updateComplete;
      expect(trigger.getAttribute('aria-label')).toBe('Idioma');

      el.triggerAriaLabel = '';
      await el.updateComplete;
      expect(trigger.getAttribute('aria-label')).toBe('Idioma');
    });

    it('works with attrForSelected and dynamicLabel', async () => {
      const el = await renderAndFocusTrigger(`
        <dile-selector-overlay dynamicLabel attrForSelected="name" selected="users">
          <dile-selector-item name="users">Users</dile-selector-item>
          <dile-selector-item name="posts">Posts</dile-selector-item>
        </dile-selector-overlay>
      `);
      const items = el.querySelectorAll('dile-selector-item');
      expect(triggerOf(el).getAttribute('aria-label')).toBe('Users, Options');

      await pressAndWait('{Enter}');
      expect(document.activeElement).toBe(items[0]);
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{Enter}');
      await el.updateComplete;

      expect(el.selected).toBe('posts');
      expect(triggerOf(el).querySelector('dile-lucide-badge').textContent.trim()).toBe('Posts');
      expect(triggerOf(el).getAttribute('aria-label')).toBe('Posts, Options');
      expectFocusOnTrigger(el);
    });

    it('works with selectorId, focusing the option selected from another component', async () => {
      const el = await renderAndFocusTrigger(`<dile-selector-overlay selectorId="keyboard-sync">${threeItems}</dile-selector-overlay>`);
      const items = el.querySelectorAll('dile-selector-item');
      const details = [];
      const listener = (e) => details.push(e.detail);
      window.addEventListener('dile-selected-changed', listener);

      window.dispatchEvent(new CustomEvent('dile-selected-changed', { detail: { selected: 2, selectorId: 'keyboard-sync' } }));
      await el.updateComplete;
      await pressAndWait('{Enter}');
      expect(document.activeElement).toBe(items[2]);

      await userEvent.keyboard('{Home}');
      await userEvent.keyboard('{Enter}');
      await el.updateComplete;
      window.removeEventListener('dile-selected-changed', listener);

      expect(el.selected).toBe(0);
      expect(details.at(-1).selectorId).toBe('keyboard-sync');
      expect(details.at(-1).selected).toBe(0);
    });

    it('works with hashSelection', async () => {
      const el = await renderAndFocusTrigger(`
        <dile-selector-overlay hashSelection attrForSelected="name">
          <dile-selector-item name="kb-apple">Apple</dile-selector-item>
          <dile-selector-item name="kb-lemon">Lemon</dile-selector-item>
        </dile-selector-overlay>
      `);
      await pressAndWait('{Enter}');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{Enter}');
      await el.updateComplete;
      await wait(0);

      expect(el.selected).toBe('kb-lemon');
      expect(window.location.hash).toBe('#kb-lemon');
      expectFocusOnTrigger(el);
      window.location.hash = '';
    });

    it('selects and returns the focus with a link option activated with the keyboard', async () => {
      const el = await renderAndFocusTrigger(`
        <dile-selector-overlay>
          <dile-selector-item href="#overlay-no-target-a">A</dile-selector-item>
          <dile-selector-item href="#overlay-no-target-b">B</dile-selector-item>
        </dile-selector-overlay>
      `);
      await pressAndWait('{Enter}');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{Enter}');
      await el.updateComplete;
      await wait(0);

      expect(el.selected).toBe(1);
      expect(window.location.hash).toBe('#overlay-no-target-b');
      expect(isOpened(el)).toBe(false);
      expectFocusOnTrigger(el);
      window.location.hash = '';
    });

    it('selects with a real mouse click, without showing a focus ring', async () => {
      const el = await renderSelectorOverlay(surrounded(`<dile-selector-overlay>${threeItems}</dile-selector-overlay>`));
      const items = el.querySelectorAll('dile-selector-item');

      await userEvent.click(triggerOf(el));
      await wait(OPEN_DELAY);
      expect(isOpened(el)).toBe(true);
      expect(items[0].shadowRoot.querySelector('button').matches(':focus-visible')).toBe(false);

      await userEvent.click(items[1]);
      await el.updateComplete;
      expect(el.selected).toBe(1);
      expect(isOpened(el)).toBe(false);
      expect(triggerOf(el).matches(':focus-visible')).toBe(false);
    });

    it('does not take the focus back when closed by clicking on another element', async () => {
      const el = await renderSelectorOverlay(surrounded(`<dile-selector-overlay>${threeItems}</dile-selector-overlay>`));
      const after = document.getElementById('after');

      await userEvent.click(triggerOf(el));
      await wait(OPEN_DELAY);
      await userEvent.click(after);
      await el.updateComplete;

      expect(isOpened(el)).toBe(false);
      expect(document.activeElement).toBe(after);
    });

    it('inside a modal, Escape closes only the menu and a second Escape closes the modal', async () => {
      document.body.innerHTML = `
        <dile-modal opened>
          <dile-selector-overlay>${threeItems}</dile-selector-overlay>
        </dile-modal>
      `;
      const modal = document.querySelector('dile-modal');
      const el = document.querySelector('dile-selector-overlay');
      await modal.updateComplete;
      await el.updateComplete;

      triggerOf(el).focus();
      await pressAndWait('{Enter}');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{Enter}');
      await el.updateComplete;
      expect(el.selected).toBe(1);
      expect(isOpened(el)).toBe(false);
      expect(modal.opened).toBe(true);

      await pressAndWait('{Enter}');
      await userEvent.keyboard('{Escape}');
      await el.updateComplete;
      expect(isOpened(el)).toBe(false);
      expect(modal.opened).toBe(true);
      expectFocusOnTrigger(el);

      await userEvent.keyboard('{Escape}');
      expect(modal.opened).toBe(false);
    });
  });
});
