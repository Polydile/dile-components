import { describe, it, expect, afterEach } from 'vitest';
import { userEvent } from 'vitest/browser';
import './menu-overlay.js';

describe('dile-menu-overlay', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderMenuOverlay(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-menu-overlay');
    await el.updateComplete;
    return el;
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  it('renders the trigger and content slots', async () => {
    const el = await renderMenuOverlay(`
      <dile-menu-overlay>
        <button slot="trigger">Open</button>
        <div slot="content">Menu content</div>
      </dile-menu-overlay>
    `);
    expect(el.shadowRoot.getElementById('trigger')).toBeTruthy();
    expect(el.shadowRoot.getElementById('overlay')).toBeTruthy();
  });

  it('opens the overlay when the trigger is clicked', async () => {
    const el = await renderMenuOverlay(`
      <dile-menu-overlay>
        <button slot="trigger">Open</button>
        <div slot="content">Menu content</div>
      </dile-menu-overlay>
    `);

    el.shadowRoot.getElementById('trigger').click();
    await wait(100);

    expect(el.shadowRoot.getElementById('overlay').classList.contains('opened')).toBe(true);
  });

  describe('keyboard', () => {
    const markup = `
      <dile-menu-overlay>
        <button slot="trigger" id="open">Open</button>
        <div slot="content"><a href="#menu-no-target" id="option">Option</a></div>
      </dile-menu-overlay>
    `;

    function isOpened(el) {
      return el.shadowRoot.getElementById('overlay').classList.contains('opened');
    }

    it('opens with the keyboard from a focusable trigger and closes with Escape', async () => {
      const el = await renderMenuOverlay(markup);
      let closed = 0;
      el.addEventListener('overlay-closed', () => { closed++; });

      document.getElementById('open').focus();
      await userEvent.keyboard('{Enter}');
      await wait(100);
      expect(isOpened(el)).toBe(true);

      await userEvent.keyboard('{Escape}');
      expect(isOpened(el)).toBe(false);
      expect(closed).toBe(1);
      expect(document.activeElement).toBe(document.getElementById('open'));
    });

    it('returns the focus to where it was when closing with Escape from the inside', async () => {
      const el = await renderMenuOverlay(markup);
      const trigger = document.getElementById('open');

      trigger.focus();
      await userEvent.keyboard('{Enter}');
      await wait(100);
      await userEvent.keyboard('{Tab}');
      expect(document.activeElement).toBe(document.getElementById('option'));

      await userEvent.keyboard('{Escape}');
      await el.updateComplete;
      expect(isOpened(el)).toBe(false);
      expect(document.activeElement).toBe(trigger);
    });

    it('closes with Escape when it was opened with the open() method and the focus is elsewhere', async () => {
      const el = await renderMenuOverlay(`${markup}<button id="other">Other</button>`);
      const other = document.getElementById('other');
      other.focus();

      el.open();
      await wait(100);
      await userEvent.keyboard('{Escape}');

      expect(isOpened(el)).toBe(false);
      expect(document.activeElement).toBe(other);
    });

    it('lets the Escape key through when it is closed', async () => {
      await renderMenuOverlay(markup);
      let received = 0;
      const listener = (e) => { if (e.key === 'Escape') received++; };
      window.addEventListener('keydown', listener);

      await userEvent.keyboard('{Escape}');
      window.removeEventListener('keydown', listener);

      expect(received).toBe(1);
    });

    it('stops listening to the Escape key when removed from the document', async () => {
      const el = await renderMenuOverlay(markup);
      el.open();
      await wait(100);
      el.remove();

      await userEvent.keyboard('{Escape}');
      expect(isOpened(el)).toBe(true);
    });

    it('leaves the content out of the tab sequence while it is closing', async () => {
      const el = await renderMenuOverlay(`${markup}<button id="other">Other</button>`);
      const trigger = document.getElementById('open');

      trigger.focus();
      await userEvent.keyboard('{Enter}');
      await wait(100);
      await userEvent.keyboard('{Escape}');
      await el.updateComplete;
      await userEvent.keyboard('{Tab}');

      expect(document.activeElement).toBe(document.getElementById('other'));
    });

    it('dispatches overlay-ready once the content can receive the focus', async () => {
      const el = await renderMenuOverlay(markup);
      let focused = null;
      el.addEventListener('overlay-ready', () => {
        const option = document.getElementById('option');
        option.focus();
        focused = document.activeElement === option;
      });

      el.open();
      await wait(100);
      expect(focused).toBe(true);
    });

    it('keeps closeOnClickInside working with a real click', async () => {
      const el = await renderMenuOverlay(`
        <dile-menu-overlay closeOnClickInside>
          <button slot="trigger" id="open">Open</button>
          <div slot="content"><span id="inside">Inside</span></div>
        </dile-menu-overlay>
      `);

      await userEvent.click(document.getElementById('open'));
      await wait(100);
      await userEvent.click(document.getElementById('inside'));
      expect(isOpened(el)).toBe(false);
    });

    it('stays opened on a real click inside without closeOnClickInside', async () => {
      const el = await renderMenuOverlay(`
        <dile-menu-overlay>
          <button slot="trigger" id="open">Open</button>
          <div slot="content"><span id="inside">Inside</span></div>
        </dile-menu-overlay>
      `);

      await userEvent.click(document.getElementById('open'));
      await wait(100);
      await userEvent.click(document.getElementById('inside'));
      expect(isOpened(el)).toBe(true);
    });
  });
});
