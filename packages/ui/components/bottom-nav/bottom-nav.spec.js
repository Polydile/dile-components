import { describe, it, expect, afterEach } from 'vitest';
import '@dile/iconlib/lucide-icons/house.js';
import './bottom-nav.js';

describe('dile-bottom-nav', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.documentElement.style.overflow = '';
  });

  async function renderNav(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-bottom-nav');
    await el.updateComplete;
    const items = [...el.querySelectorAll('dile-bottom-nav-item')];
    await Promise.all(items.map((item) => item.updateComplete));
    // Wait for slotchange to detect the sheets.
    await new Promise((resolve) => setTimeout(resolve));
    await Promise.all(items.map((item) => item.updateComplete));
    return { el, items };
  }

  function trigger(item) {
    return item.shadowRoot.querySelector('.trigger');
  }

  it('renders a navigation landmark with the slotted items', async () => {
    const { el, items } = await renderNav(`
      <dile-bottom-nav label="App navigation">
        <dile-bottom-nav-item label="Home"></dile-bottom-nav-item>
        <dile-bottom-nav-item label="Search"></dile-bottom-nav-item>
      </dile-bottom-nav>
    `);

    const nav = el.shadowRoot.querySelector('nav');
    expect(nav.getAttribute('aria-label')).toBe('App navigation');
    expect(items.length).toBe(2);
    expect(items[0].shadowRoot.querySelector('.label').textContent).toBe('Home');
  });

  it('is fixed by default and in the document flow when static', async () => {
    const { el } = await renderNav(`<dile-bottom-nav></dile-bottom-nav>`);
    expect(getComputedStyle(el).position).toBe('fixed');

    el.static = true;
    await el.updateComplete;
    expect(getComputedStyle(el).position).toBe('relative');
  });

  it('compensates the scrollbar width in the fixed bar while the page scroll is locked', async () => {
    const { el } = await renderNav(`<dile-bottom-nav></dile-bottom-nav>`);
    document.documentElement.style.setProperty('--dile-bottom-nav-scrollbar-width', '15px');

    expect(getComputedStyle(el).paddingRight).toBe('15px');
    el.static = true;
    await el.updateComplete;
    expect(getComputedStyle(el).paddingRight).toBe('0px');

    document.documentElement.style.removeProperty('--dile-bottom-nav-scrollbar-width');
  });

  it('renders the icon of the item from a dile-iconlib string', async () => {
    const { items } = await renderNav(`
      <dile-bottom-nav>
        <dile-bottom-nav-item label="Home" icon="lucide.house"></dile-bottom-nav-item>
        <dile-bottom-nav-item label="Search"></dile-bottom-nav-item>
      </dile-bottom-nav>
    `);

    const icon = items[0].shadowRoot.querySelector('dile-iconlib');
    expect(icon.getAttribute('icon')).toBe('lucide.house');
    expect(items[1].shadowRoot.querySelector('dile-iconlib')).toBeNull();
  });

  it('marks the selected item by attribute and changes selection on click', async () => {
    const { el, items } = await renderNav(`
      <dile-bottom-nav attrForSelected="name" selected="home">
        <dile-bottom-nav-item name="home" label="Home"></dile-bottom-nav-item>
        <dile-bottom-nav-item name="search" label="Search"></dile-bottom-nav-item>
      </dile-bottom-nav>
    `);

    expect(items[0].selected).toBe(true);
    expect(trigger(items[0]).getAttribute('aria-current')).toBe('page');

    let detail;
    el.addEventListener('dile-selected-changed', (e) => { detail = e.detail; });
    trigger(items[1]).click();
    await el.updateComplete;

    expect(el.selected).toBe('search');
    expect(detail.selected).toBe('search');
    expect(items[1].selected).toBe(true);
    expect(items[0].selected).toBe(false);
  });

  it('dispatches dile-bottom-nav-item-click with the item name', async () => {
    const { el, items } = await renderNav(`
      <dile-bottom-nav>
        <dile-bottom-nav-item name="home" label="Home"></dile-bottom-nav-item>
      </dile-bottom-nav>
    `);

    let detail;
    el.addEventListener('dile-bottom-nav-item-click', (e) => { detail = e.detail; });
    trigger(items[0]).click();

    expect(detail.name).toBe('home');
  });

  it('renders a native link when the item has an href', async () => {
    const { items } = await renderNav(`
      <dile-bottom-nav>
        <dile-bottom-nav-item label="Home" href="#home" target="_self"></dile-bottom-nav-item>
        <dile-bottom-nav-item label="Search"></dile-bottom-nav-item>
      </dile-bottom-nav>
    `);

    const link = items[0].shadowRoot.querySelector('a');
    expect(link.getAttribute('href')).toBe('#home');
    expect(link.getAttribute('target')).toBe('_self');
    expect(items[1].shadowRoot.querySelector('a')).toBeNull();
  });

  it('opens the bottom sheet of an item with slotted content without changing the selection', async () => {
    const { el, items } = await renderNav(`
      <dile-bottom-nav attrForSelected="name" selected="home">
        <dile-bottom-nav-item name="home" label="Home"></dile-bottom-nav-item>
        <dile-bottom-nav-item name="create" label="Create">
          <a href="#new">New</a>
        </dile-bottom-nav-item>
      </dile-bottom-nav>
    `);

    const button = trigger(items[1]);
    expect(button.getAttribute('aria-haspopup')).toBe('dialog');
    expect(button.getAttribute('aria-expanded')).toBe('false');

    let opened = false;
    el.addEventListener('dile-bottom-nav-sheet-opened', () => { opened = true; });
    button.click();
    await items[1].updateComplete;

    expect(items[1].opened).toBe(true);
    expect(opened).toBe(true);
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(document.documentElement.style.overflow).toBe('hidden');
    expect(el.selected).toBe('home');
    expect(items[0].selected).toBe(true);
  });

  it('closes the sheet when clicking the overlay', async () => {
    const { items } = await renderNav(`
      <dile-bottom-nav>
        <dile-bottom-nav-item label="Create"><p>Content</p></dile-bottom-nav-item>
      </dile-bottom-nav>
    `);

    await items[0].open();
    let closed = false;
    items[0].addEventListener('dile-bottom-nav-sheet-closed', () => { closed = true; });
    items[0].shadowRoot.querySelector('.overlay').click();
    await items[0].updateComplete;

    expect(items[0].opened).toBe(false);
    expect(closed).toBe(true);
    expect(document.documentElement.style.overflow).toBe('');
  });

  it('closes the sheet when pressing Escape', async () => {
    const { items } = await renderNav(`
      <dile-bottom-nav>
        <dile-bottom-nav-item label="Create"><p>Content</p></dile-bottom-nav-item>
      </dile-bottom-nav>
    `);

    await items[0].open();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await items[0].updateComplete;

    expect(items[0].opened).toBe(false);
  });

  it('closes the sheet when clicking an element with data-close', async () => {
    const { items } = await renderNav(`
      <dile-bottom-nav>
        <dile-bottom-nav-item label="Create">
          <button id="keep">Keep</button>
          <button id="close" data-close>Close</button>
        </dile-bottom-nav-item>
      </dile-bottom-nav>
    `);

    await items[0].open();
    document.getElementById('keep').click();
    await items[0].updateComplete;
    expect(items[0].opened).toBe(true);

    document.getElementById('close').click();
    await items[0].updateComplete;
    expect(items[0].opened).toBe(false);
  });

  it('closes the sheet when clicking any link or button with close-on-click', async () => {
    const { items } = await renderNav(`
      <dile-bottom-nav>
        <dile-bottom-nav-item label="Create" close-on-click>
          <button id="action">Action</button>
        </dile-bottom-nav-item>
      </dile-bottom-nav>
    `);

    await items[0].open();
    document.getElementById('action').click();
    await items[0].updateComplete;

    expect(items[0].opened).toBe(false);
  });

  it('keeps only one sheet opened at a time', async () => {
    const { items } = await renderNav(`
      <dile-bottom-nav>
        <dile-bottom-nav-item label="One"><p>One</p></dile-bottom-nav-item>
        <dile-bottom-nav-item label="Two"><p>Two</p></dile-bottom-nav-item>
      </dile-bottom-nav>
    `);

    await items[0].open();
    await items[1].open();
    await items[0].updateComplete;

    expect(items[0].opened).toBe(false);
    expect(items[1].opened).toBe(true);
  });

  it('replaces the item icon with the close icon while the sheet is opened', async () => {
    const { items } = await renderNav(`
      <dile-bottom-nav>
        <dile-bottom-nav-item label="Create"><p>Content</p></dile-bottom-nav-item>
      </dile-bottom-nav>
    `);

    expect(items[0].shadowRoot.querySelector('.close-icon')).toBeNull();
    await items[0].open();
    expect(items[0].shadowRoot.querySelector('.close-icon dile-iconlib').getAttribute('icon')).toBe('lucide.x');
    expect(items[0].shadowRoot.querySelector('.trigger').textContent).toContain('Create');

    trigger(items[0]).click();
    await items[0].updateComplete;
    expect(items[0].opened).toBe(false);
    expect(items[0].shadowRoot.querySelector('.close-icon')).toBeNull();
  });

  it('places the sheet and the overlay above the bar', async () => {
    const { el, items } = await renderNav(`
      <dile-bottom-nav>
        <dile-bottom-nav-item label="Create"><p>Content</p></dile-bottom-nav-item>
      </dile-bottom-nav>
    `);

    await items[0].open();
    await items[0].updateComplete;
    const barTop = el.getBoundingClientRect().top;
    const barHeight = window.innerHeight - barTop;
    // Read the computed bottom instead of the bounding box, which is affected by the opening transition.
    const sheetBottom = parseFloat(getComputedStyle(items[0].shadowRoot.querySelector('.sheet')).bottom);
    const overlay = items[0].shadowRoot.querySelector('.overlay').getBoundingClientRect();

    expect(sheetBottom).toBeGreaterThanOrEqual(Math.floor(barHeight));
    expect(Math.round(overlay.bottom)).toBe(Math.round(barTop));
  });

  describe('static bar', () => {
    async function renderStatic() {
      const result = await renderNav(`
        <div style="height: 400px"></div>
        <dile-bottom-nav static style="width: 300px; margin: 0 auto;">
          <dile-bottom-nav-item label="Home"></dile-bottom-nav-item>
          <dile-bottom-nav-item label="Create"><button id="inside">Inside</button></dile-bottom-nav-item>
        </dile-bottom-nav>
        <button id="outside">Outside</button>
      `);
      await result.items[1].open();
      await result.items[1].updateComplete;
      return result;
    }

    it('opens a floating sheet without overlay and without locking the page scroll', async () => {
      const { items } = await renderStatic();
      const overlay = items[1].shadowRoot.querySelector('.overlay');
      const sheet = items[1].shadowRoot.querySelector('.sheet');

      expect(getComputedStyle(overlay).display).toBe('none');
      expect(sheet.classList.contains('floating')).toBe(true);
      expect(sheet.getAttribute('aria-modal')).toBe('false');
      expect(document.documentElement.style.overflow).toBe('');
    });

    it('places the floating sheet above the trigger, centered and inside the viewport', async () => {
      const { items } = await renderStatic();
      const sheet = items[1].shadowRoot.querySelector('.sheet');
      const triggerRect = trigger(items[1]).getBoundingClientRect();
      // Inline position set by DileOverlay, not affected by the opening transition.
      const top = parseFloat(sheet.style.top);
      const left = parseFloat(sheet.style.left);
      const width = sheet.offsetWidth;

      expect(top + sheet.offsetHeight).toBeLessThanOrEqual(triggerRect.top);
      expect(left).toBeGreaterThanOrEqual(10);
      expect(left + width).toBeLessThanOrEqual(document.documentElement.clientWidth - 10);
      const centered = triggerRect.left + triggerRect.width / 2 - width / 2;
      const clamped = Math.min(Math.max(centered, 10), document.documentElement.clientWidth - width - 15);
      expect(Math.round(left)).toBe(Math.round(clamped));
    });

    it('closes the floating sheet when clicking outside, but not inside', async () => {
      const { items } = await renderStatic();

      document.getElementById('inside').click();
      await items[1].updateComplete;
      expect(items[1].opened).toBe(true);

      document.getElementById('outside').click();
      await items[1].updateComplete;
      expect(items[1].opened).toBe(false);
    });

    it('toggles the floating sheet from the trigger', async () => {
      const { items } = await renderStatic();

      trigger(items[1]).click();
      await items[1].updateComplete;
      expect(items[1].opened).toBe(false);

      trigger(items[1]).click();
      await items[1].updateComplete;
      expect(items[1].opened).toBe(true);
    });
  });
});
