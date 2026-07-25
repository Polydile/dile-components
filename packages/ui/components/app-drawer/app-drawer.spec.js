import { describe, it, expect, afterEach } from 'vitest';
import './app-drawer.js';
import { DILE_APP_DRAWER_EVENT_CLOSED, DILE_APP_DRAWER_EVENT_CLOSE_OUTSIDE } from './index.js';

describe('dile-app-drawer', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function renderDrawer(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-app-drawer');
    await el.updateComplete;
    return el;
  }

  describe('Default state', () => {
    it('defaults to direction "top" and closed', async () => {
      const el = await renderDrawer('<dile-app-drawer></dile-app-drawer>');

      expect(el.direction).toBe('top');
      expect(el.opened).toBe(false);
    });

    it('reflects the opened property to the opened attribute', async () => {
      const el = await renderDrawer('<dile-app-drawer></dile-app-drawer>');

      el.open();
      await el.updateComplete;

      expect(el.hasAttribute('opened')).toBe(true);
    });
  });

  describe('Public API', () => {
    it('open() sets opened to true', async () => {
      const el = await renderDrawer('<dile-app-drawer></dile-app-drawer>');

      el.open();
      await el.updateComplete;

      expect(el.opened).toBe(true);
    });

    it('close() sets opened to false and dispatches dile-app-drawer-closed', async () => {
      const el = await renderDrawer('<dile-app-drawer opened></dile-app-drawer>');
      let fired = false;
      el.addEventListener(DILE_APP_DRAWER_EVENT_CLOSED, () => { fired = true; });

      el.close();
      await el.updateComplete;

      expect(el.opened).toBe(false);
      expect(fired).toBe(true);
    });

    it('toggle() flips the opened state', async () => {
      const el = await renderDrawer('<dile-app-drawer></dile-app-drawer>');

      el.toggle();
      await el.updateComplete;
      expect(el.opened).toBe(true);

      el.toggle();
      await el.updateComplete;
      expect(el.opened).toBe(false);
    });
  });

  describe('Modal overlay', () => {
    it('renders a modal overlay by default', async () => {
      const el = await renderDrawer('<dile-app-drawer></dile-app-drawer>');

      expect(el.shadowRoot.querySelector('.modal')).toBeTruthy();
    });

    it('does not render a modal overlay when no-modal is set', async () => {
      const el = await renderDrawer('<dile-app-drawer no-modal></dile-app-drawer>');

      expect(el.shadowRoot.querySelector('.modal')).toBeNull();
    });

    it('clicking the overlay closes the drawer and dispatches closed + click-outside events', async () => {
      const el = await renderDrawer('<dile-app-drawer opened></dile-app-drawer>');
      let closedFired = false;
      let outsideFired = false;
      el.addEventListener(DILE_APP_DRAWER_EVENT_CLOSED, () => { closedFired = true; });
      el.addEventListener(DILE_APP_DRAWER_EVENT_CLOSE_OUTSIDE, () => { outsideFired = true; });

      el.shadowRoot.querySelector('.modal').click();
      await el.updateComplete;

      expect(el.opened).toBe(false);
      expect(closedFired).toBe(true);
      expect(outsideFired).toBe(true);
    });

    it('clicking the overlay while already closed does not dispatch events', async () => {
      const el = await renderDrawer('<dile-app-drawer></dile-app-drawer>');
      let outsideFired = false;
      el.addEventListener(DILE_APP_DRAWER_EVENT_CLOSE_OUTSIDE, () => { outsideFired = true; });

      el.shadowRoot.querySelector('.modal').click();
      await el.updateComplete;

      expect(outsideFired).toBe(false);
    });

    it('stops click events on the menu content from bubbling past the drawer', async () => {
      const el = await renderDrawer('<div id="wrapper"><dile-app-drawer opened></dile-app-drawer></div>');
      const wrapper = document.querySelector('#wrapper');
      let wrapperClicked = false;
      wrapper.addEventListener('click', () => { wrapperClicked = true; });

      el.shadowRoot.querySelector('.menu').click();

      expect(wrapperClicked).toBe(false);
      expect(el.opened).toBe(true);
    });
  });

  describe('Dialog accessibility', () => {
    it('renders the menu as a labeled, described dialog', async () => {
      const el = await renderDrawer('<dile-app-drawer></dile-app-drawer>');
      const menu = el.shadowRoot.querySelector('.menu');

      expect(menu.getAttribute('role')).toBe('dialog');
      expect(menu.getAttribute('aria-label')).toBe('Application menu');
      expect(menu.getAttribute('aria-description')).toContain('Escape');
    });

    it('sets aria-modal to reflect the opened state', async () => {
      const el = await renderDrawer('<dile-app-drawer></dile-app-drawer>');
      const menu = el.shadowRoot.querySelector('.menu');

      expect(menu.getAttribute('aria-modal')).toBe('false');

      el.open();
      await el.updateComplete;

      expect(menu.getAttribute('aria-modal')).toBe('true');
    });

    it('marks the menu (and overlay) inert while closed, interactive while opened', async () => {
      const el = await renderDrawer('<dile-app-drawer></dile-app-drawer>');
      const menu = el.shadowRoot.querySelector('.menu');
      const modal = el.shadowRoot.querySelector('.modal');

      expect(menu.hasAttribute('inert')).toBe(true);
      expect(modal.hasAttribute('inert')).toBe(true);

      el.open();
      await el.updateComplete;

      expect(menu.hasAttribute('inert')).toBe(false);
      expect(modal.hasAttribute('inert')).toBe(false);
    });
  });

  describe('Keyboard - Escape', () => {
    it('closes the drawer when Escape is pressed while opened', async () => {
      const el = await renderDrawer('<dile-app-drawer opened></dile-app-drawer>');

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await el.updateComplete;

      expect(el.opened).toBe(false);
    });

    it('does nothing when Escape is pressed while already closed', async () => {
      const el = await renderDrawer('<dile-app-drawer></dile-app-drawer>');

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await el.updateComplete;

      expect(el.opened).toBe(false);
    });
  });

  describe('Focus management', () => {
    it('moves focus into the menu when opened', async () => {
      const el = await renderDrawer('<dile-app-drawer><button>Item</button></dile-app-drawer>');

      el.open();
      await el.updateComplete;

      expect(el.shadowRoot.activeElement).toBe(el.shadowRoot.querySelector('.menu'));
    });

    it('restores focus to the trigger element after closing', async () => {
      document.body.innerHTML = '<button id="trigger">Open</button><dile-app-drawer></dile-app-drawer>';
      const trigger = document.querySelector('#trigger');
      const el = document.querySelector('dile-app-drawer');
      await el.updateComplete;

      trigger.focus();
      el.open();
      await el.updateComplete;
      el.close();
      await el.updateComplete;
      await wait(10);

      expect(document.activeElement).toBe(trigger);
    });

    it('traps Tab focus: wraps from the last focusable element to the first', async () => {
      const el = await renderDrawer(`
        <dile-app-drawer opened>
          <button id="first">First</button>
          <button id="last">Last</button>
        </dile-app-drawer>
      `);
      await el.updateComplete;
      const first = el.querySelector('#first');
      const last = el.querySelector('#last');

      last.focus();
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));

      expect(document.activeElement).toBe(first);
    });

    it('traps Shift+Tab focus: wraps from the first focusable element to the last', async () => {
      const el = await renderDrawer(`
        <dile-app-drawer opened>
          <button id="first">First</button>
          <button id="last">Last</button>
        </dile-app-drawer>
      `);
      await el.updateComplete;
      const first = el.querySelector('#first');
      const last = el.querySelector('#last');

      first.focus();
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true }));

      expect(document.activeElement).toBe(last);
    });

    it('does not move focus when Tab is pressed with focus outside the drawer', async () => {
      document.body.innerHTML = `
        <input id="outside" />
        <dile-app-drawer opened>
          <button id="first">First</button>
          <button id="last">Last</button>
        </dile-app-drawer>
      `;
      const el = document.querySelector('dile-app-drawer');
      await el.updateComplete;
      const outside = document.querySelector('#outside');

      outside.focus();
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));

      expect(document.activeElement).toBe(outside);
    });
  });
});
