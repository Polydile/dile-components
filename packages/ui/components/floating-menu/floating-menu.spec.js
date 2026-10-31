import { describe, it, expect, afterEach } from 'vitest';
import './floating-menu.js';
import './floating-menu-item.js';

describe('dile-floating-menu', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderFloatingMenu(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-floating-menu');
    await el.updateComplete;
    return el;
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Waits for the opening delay of DileOverlay.
  async function openMenu(el) {
    el.open();
    await el.updateComplete;
    await wait(100);
  }

  function isOverlayOpened(el) {
    return el.shadowRoot.getElementById('overlay').classList.contains('opened');
  }

  function trigger(el) {
    return el.shadowRoot.getElementById('trigger');
  }

  it('renders closed by default', async () => {
    const el = await renderFloatingMenu('<dile-floating-menu></dile-floating-menu>');
    expect(el.opened).toBe(false);
    expect(trigger(el)).toBeTruthy();
    expect(isOverlayOpened(el)).toBe(false);
    expect(getComputedStyle(el.shadowRoot.getElementById('overlay')).display).toBe('none');
  });

  // Closing the overlay in updated() needs a second update to render its class.
  async function settle(el) {
    await el.updateComplete;
    await el.updateComplete;
  }

  it('toggles opened state when the button is clicked', async () => {
    const el = await renderFloatingMenu('<dile-floating-menu></dile-floating-menu>');
    trigger(el).click();
    await el.updateComplete;
    await wait(100);

    expect(el.opened).toBe(true);
    expect(el.hasAttribute('opened')).toBe(true);
    expect(isOverlayOpened(el)).toBe(true);

    trigger(el).click();
    await settle(el);

    expect(el.opened).toBe(false);
    expect(isOverlayOpened(el)).toBe(false);
  });

  it('opens from the opened attribute and closes when it is removed', async () => {
    const el = await renderFloatingMenu('<dile-floating-menu opened></dile-floating-menu>');
    await wait(100);
    expect(isOverlayOpened(el)).toBe(true);

    el.removeAttribute('opened');
    await settle(el);
    expect(isOverlayOpened(el)).toBe(false);
  });

  it('closes when it is closed during the opening delay', async () => {
    const el = await renderFloatingMenu('<dile-floating-menu></dile-floating-menu>');
    el.open();
    await el.updateComplete;
    el.opened = false;
    await el.updateComplete;
    await wait(100);

    expect(isOverlayOpened(el)).toBe(false);
  });

  it('dispatches the overlay events', async () => {
    const el = await renderFloatingMenu('<dile-floating-menu></dile-floating-menu>');
    const events = [];
    el.addEventListener('overlay-opened', () => events.push('opened'));
    el.addEventListener('overlay-closed', () => events.push('closed'));

    await openMenu(el);
    el.close();
    await el.updateComplete;

    expect(events).toEqual(['opened', 'closed']);
  });

  describe('accessibility', () => {
    it('names the button with the label property', async () => {
      const el = await renderFloatingMenu('<dile-floating-menu></dile-floating-menu>');
      expect(trigger(el).getAttribute('aria-label')).toBe('Menu');

      el.label = 'Pending payment';
      await el.updateComplete;
      expect(trigger(el).getAttribute('aria-label')).toBe('Pending payment');
    });

    it('reflects the state in aria-expanded and links the overlay with aria-controls', async () => {
      const el = await renderFloatingMenu('<dile-floating-menu></dile-floating-menu>');
      expect(trigger(el).getAttribute('aria-expanded')).toBe('false');
      expect(trigger(el).getAttribute('aria-controls')).toBe('overlay');

      await openMenu(el);
      expect(trigger(el).getAttribute('aria-expanded')).toBe('true');
    });

    it('keeps the content inert while closed', async () => {
      const el = await renderFloatingMenu('<dile-floating-menu></dile-floating-menu>');
      expect(el.shadowRoot.getElementById('overlay').hasAttribute('inert')).toBe(true);

      await openMenu(el);
      expect(el.shadowRoot.getElementById('overlay').hasAttribute('inert')).toBe(false);
    });

    it('closes with Escape and returns the focus to the button', async () => {
      const el = await renderFloatingMenu(`
        <dile-floating-menu><a id="link" href="#">Link</a></dile-floating-menu>
      `);
      await openMenu(el);
      document.getElementById('link').focus();

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await el.updateComplete;
      await wait(0);

      expect(el.opened).toBe(false);
      expect(el.shadowRoot.activeElement).toBe(trigger(el));
    });

    it('closes when the focus leaves the component', async () => {
      const el = await renderFloatingMenu(`
        <dile-floating-menu><a id="link" href="#">Link</a></dile-floating-menu>
        <button id="outside">Outside</button>
      `);
      await openMenu(el);
      document.getElementById('link').focus();
      expect(el.opened).toBe(true);

      document.getElementById('outside').focus();
      await el.updateComplete;

      expect(el.opened).toBe(false);
      expect(document.activeElement).toBe(document.getElementById('outside'));
    });

    it('stays opened when the focus moves inside the component', async () => {
      const el = await renderFloatingMenu(`
        <dile-floating-menu><a id="link" href="#">Link</a></dile-floating-menu>
      `);
      await openMenu(el);
      trigger(el).focus();
      document.getElementById('link').focus();
      await el.updateComplete;

      expect(el.opened).toBe(true);
    });
  });

  describe('closing by clicks', () => {
    it('closes when clicking outside', async () => {
      const el = await renderFloatingMenu(`
        <dile-floating-menu></dile-floating-menu>
        <div id="outside">Outside</div>
      `);
      await openMenu(el);
      document.getElementById('outside').click();
      await el.updateComplete;

      expect(el.opened).toBe(false);
    });

    it('stays opened when clicking the content, and lets the click reach the document', async () => {
      const el = await renderFloatingMenu(`
        <dile-floating-menu><p id="inside">Inside</p></dile-floating-menu>
      `);
      await openMenu(el);
      let reachedDocument = false;
      const listener = () => { reachedDocument = true; };
      document.addEventListener('click', listener);
      document.getElementById('inside').click();
      document.removeEventListener('click', listener);
      await el.updateComplete;

      expect(el.opened).toBe(true);
      expect(reachedDocument).toBe(true);
    });

    it('closes when clicking an element with data-close', async () => {
      const el = await renderFloatingMenu(`
        <dile-floating-menu><div><span data-close id="closer">Close</span></div></dile-floating-menu>
      `);
      await openMenu(el);
      document.getElementById('closer').click();
      await el.updateComplete;

      expect(el.opened).toBe(false);
    });

    it('only closes when clicking links or buttons if it has close-on-click', async () => {
      const el = await renderFloatingMenu(`
        <dile-floating-menu>
          <button id="action">Action</button>
          <dile-floating-menu-item id="item" href="#">Item</dile-floating-menu-item>
        </dile-floating-menu>
      `);
      await openMenu(el);
      document.getElementById('action').click();
      await el.updateComplete;
      expect(el.opened).toBe(true);

      el.closeOnClick = true;
      await el.updateComplete;
      document.getElementById('action').click();
      await el.updateComplete;
      expect(el.opened).toBe(false);

      await openMenu(el);
      document.getElementById('item').shadowRoot.querySelector('a').click();
      await el.updateComplete;
      expect(el.opened).toBe(false);
    });

    it('closes the other menus when another one is opened', async () => {
      document.body.innerHTML = `
        <dile-floating-menu id="first"></dile-floating-menu>
        <dile-floating-menu id="second" bottom right></dile-floating-menu>
      `;
      const first = document.getElementById('first');
      const second = document.getElementById('second');
      await Promise.all([first.updateComplete, second.updateComplete]);

      trigger(first).click();
      await first.updateComplete;
      await wait(100);
      trigger(second).click();
      await Promise.all([first.updateComplete, second.updateComplete]);

      expect(first.opened).toBe(false);
      expect(second.opened).toBe(true);
    });
  });

  describe('icon slot', () => {
    it('shows the default icon when the slot is empty', async () => {
      const el = await renderFloatingMenu('<dile-floating-menu></dile-floating-menu>');
      const slot = el.shadowRoot.querySelector('slot[name="icon"]');
      expect(slot.assignedElements().length).toBe(0);
      expect(getComputedStyle(el.shadowRoot.getElementById('topline')).display).not.toBe('none');
    });

    it('places the slotted content inside the button', async () => {
      const el = await renderFloatingMenu(`
        <dile-floating-menu label="Attention"><span slot="icon" id="custom">!</span></dile-floating-menu>
      `);
      const slot = trigger(el).querySelector('slot[name="icon"]');
      expect(slot.assignedElements()[0]).toBe(document.getElementById('custom'));

      document.getElementById('custom').click();
      await el.updateComplete;
      expect(el.opened).toBe(true);
    });
  });

  describe('position', () => {
    function rects(el) {
      return {
        button: trigger(el).getBoundingClientRect(),
        overlay: el.shadowRoot.getElementById('overlay').getBoundingClientRect(),
      };
    }

    it('places the overlay under the button when it is at the top left', async () => {
      const el = await renderFloatingMenu('<dile-floating-menu><p>Content</p></dile-floating-menu>');
      await openMenu(el);
      await wait(400);
      const { button, overlay } = rects(el);

      expect(overlay.top).toBeGreaterThanOrEqual(button.bottom);
      expect(overlay.left).toBeCloseTo(button.left, 0);
    });

    it('places the overlay over the button when it is at the bottom right', async () => {
      const el = await renderFloatingMenu('<dile-floating-menu bottom right><p>Content</p></dile-floating-menu>');
      await openMenu(el);
      await wait(400);
      const { button, overlay } = rects(el);

      expect(overlay.bottom).toBeLessThanOrEqual(button.top);
      expect(overlay.right).toBeCloseTo(button.right, 0);
    });

    it('applies the margin custom properties set in an ancestor', async () => {
      document.body.innerHTML = `
        <div style="--dile-floating-menu-margin: 40px; --dile-floating-menu-margin-left: 60px;">
          <dile-floating-menu></dile-floating-menu>
        </div>
      `;
      const el = document.querySelector('dile-floating-menu');
      await el.updateComplete;
      const rect = el.getBoundingClientRect();

      expect(rect.top).toBe(40);
      expect(rect.left).toBe(60);
    });
  });

  it('closes and stops listening when it is removed from the document', async () => {
    const el = await renderFloatingMenu('<dile-floating-menu></dile-floating-menu>');
    await openMenu(el);
    el.remove();
    await settle(el);

    expect(el.opened).toBe(false);
    expect(isOverlayOpened(el)).toBe(false);
  });
});
