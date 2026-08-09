import { describe, it, expect, afterEach, vi } from 'vitest';
import './select-ajax-overlay.js';

describe('dile-select-ajax-overlay', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.unstubAllGlobals();
  });

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function mockFetch(data) {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      json: () => Promise.resolve(data),
    })));
  }

  async function renderSelectAjaxOverlay(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-select-ajax-overlay');
    await el.updateComplete;
    return el;
  }

  // Clicking a result sets the value on the *nested* dile-select-overlay, which fires its
  // own element-changed a microtask later; the outer component reacts to that in doSelected,
  // which triggers a *second* update/dispatch. Chain both updateComplete promises rather than
  // relying on a single await, which can resolve before the follow-up reaction settles.
  async function selectOption(el, index) {
    const options = el.select.shadowRoot.querySelectorAll('[role="option"]');
    options[index].click();
    await el.select.updateComplete;
    await el.updateComplete;
  }

  async function typeKeyword(el, keyword) {
    const input = el.shadowRoot.getElementById('search');
    input.value = keyword;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await wait(el.delay + 50);
    await el.updateComplete;
  }

  describe('Rendering', () => {
    it('renders the search input when nothing is selected', async () => {
      const el = await renderSelectAjaxOverlay(`
        <dile-select-ajax-overlay endpoint="/api/countries" displayProperty="name"></dile-select-ajax-overlay>
      `);

      const input = el.shadowRoot.getElementById('search');
      expect(input).toBeTruthy();
      expect(input.getAttribute('role')).toBe('combobox');
    });

    it('renders a label associated with the search input', async () => {
      const el = await renderSelectAjaxOverlay(`
        <dile-select-ajax-overlay endpoint="/api/countries" displayProperty="name" label="Country"></dile-select-ajax-overlay>
      `);

      const label = el.shadowRoot.querySelector('label');
      expect(label.textContent).toBe('Country');
      expect(label.getAttribute('for')).toBe('search');
    });

    it('keeps an initial errored/message state on mount even with hideErrorOnInput set', async () => {
      // Regression test: the nested dile-select-overlay fires its own element-changed while
      // syncing to its placeholder option on mount, which must not be treated as a real
      // selection that clears the error via hideErrorOnInput.
      const el = await renderSelectAjaxOverlay(`
        <dile-select-ajax-overlay endpoint="/api/countries" displayProperty="name" errored message="Required" hideErrorOnInput></dile-select-ajax-overlay>
      `);

      expect(el.errored).toBe(true);
      expect(el.message).toBe('Required');
    });

    it('does not let a click on the search field bubble to document (avoids racing with the global click-outside-closes handler)', async () => {
      // Regression test: clicking to refocus the field opens the nested dile-select-overlay via
      // onSearchFocus(), but that same click event then continues bubbling to document, where
      // DileCloseDocumentClick's global handler closes every registered overlay instance,
      // including the one we just opened. Stopping propagation here keeps that click from ever
      // reaching document in the first place.
      const el = await renderSelectAjaxOverlay(`
        <dile-select-ajax-overlay endpoint="/api/countries" displayProperty="name"></dile-select-ajax-overlay>
      `);

      let reachedDocument = false;
      document.addEventListener('click', () => { reachedDocument = true; });

      el.shadowRoot.querySelector('.search-wrapper').dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));

      expect(reachedDocument).toBe(false);
    });
  });

  describe('Searching (no extra click required)', () => {
    it('opens the nested popup as soon as results load, without an extra click', async () => {
      mockFetch([{ id: 1, name: 'Spain' }, { id: 2, name: 'France' }]);
      const el = await renderSelectAjaxOverlay(`
        <dile-select-ajax-overlay endpoint="/api/countries" idProperty="id" displayProperty="name" delay="10"></dile-select-ajax-overlay>
      `);

      await typeKeyword(el, 'sp');

      expect(el.data.length).toBe(2);
      expect(el.select.opened).toBe(true);
      const options = el.select.shadowRoot.querySelectorAll('[role="option"]');
      expect(options.length).toBe(2);
    });

    it('shows the empty message when there are no results', async () => {
      mockFetch([]);
      const el = await renderSelectAjaxOverlay(`
        <dile-select-ajax-overlay endpoint="/api/countries" idProperty="id" displayProperty="name" delay="10"></dile-select-ajax-overlay>
      `);

      await typeKeyword(el, 'zz');

      expect(el.shadowRoot.querySelector('.status').textContent.trim()).toBe(el.emptyMessage);
      expect(el.select.opened).toBe(false);
    });

    it('shows loading, not the empty-results message, during the debounce delay right after typing', async () => {
      // Regression test: loading must flip to true as soon as the user types, not only once
      // the debounced request actually starts, otherwise the empty-results message flashes
      // for the length of the debounce delay before any request has actually come back.
      mockFetch([{ id: 1, name: 'Spain' }]);
      const el = await renderSelectAjaxOverlay(`
        <dile-select-ajax-overlay endpoint="/api/countries" idProperty="id" displayProperty="name" delay="50"></dile-select-ajax-overlay>
      `);

      const input = el.shadowRoot.getElementById('search');
      input.value = 'sp';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      expect(el.loading).toBe(true);
      const status = el.shadowRoot.querySelector('.status');
      expect(status.querySelector('dile-spinner-horizontal')).toBeTruthy();
      expect(status.textContent.trim()).not.toBe(el.emptyMessage);
    });

    it('shows a spinner icon in the search field while loading, replacing the search/clear icon', async () => {
      mockFetch([{ id: 1, name: 'Spain' }]);
      const el = await renderSelectAjaxOverlay(`
        <dile-select-ajax-overlay endpoint="/api/countries" idProperty="id" displayProperty="name" delay="10"></dile-select-ajax-overlay>
      `);

      const input = el.shadowRoot.getElementById('search');
      input.value = 'sp';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      expect(el.shadowRoot.querySelector('dile-spinner-icon')).toBeTruthy();
      expect(el.shadowRoot.querySelector('dile-icon')).toBeNull();

      await wait(50);
      await el.updateComplete;

      expect(el.loading).toBe(false);
      expect(el.shadowRoot.querySelector('dile-spinner-icon')).toBeNull();
      expect(el.shadowRoot.querySelector('dile-icon')).toBeTruthy();
    });

    it('shows the spinner icon again on a second search even though results are already displayed', async () => {
      // Regression test: the popup's own status spinner only shows while there is no data yet,
      // so a second search (which keeps the previous results visible while it's in flight) had
      // no loading indication at all. The field's own icon must show it regardless of whether
      // there is already data on screen.
      mockFetch([{ id: 1, name: 'Spain' }]);
      const el = await renderSelectAjaxOverlay(`
        <dile-select-ajax-overlay endpoint="/api/countries" idProperty="id" displayProperty="name" delay="10"></dile-select-ajax-overlay>
      `);

      await typeKeyword(el, 'sp');
      expect(el.data.length).toBe(1);

      mockFetch([{ id: 2, name: 'France' }]);
      const input = el.shadowRoot.getElementById('search');
      input.value = 'fra';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      expect(el.data.length).toBe(1); // previous results still showing while the new search is in flight
      expect(el.shadowRoot.querySelector('dile-spinner-icon')).toBeTruthy();
    });

    it('shows the ajax error message on a failed request', async () => {
      vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('network error'))));
      const el = await renderSelectAjaxOverlay(`
        <dile-select-ajax-overlay endpoint="/api/countries" idProperty="id" displayProperty="name" delay="10"></dile-select-ajax-overlay>
      `);

      await typeKeyword(el, 'sp');

      expect(el.ajaxError).toBe(true);
      expect(el.shadowRoot.querySelector('.status').textContent.trim()).toBe(el.ajaxErrorMessage);
    });
  });

  describe('Selecting a result', () => {
    it('selecting an option sets value/selectedText, closes the popup and fires events', async () => {
      mockFetch([{ id: 1, name: 'Spain' }, { id: 2, name: 'France' }]);
      const el = await renderSelectAjaxOverlay(`
        <dile-select-ajax-overlay endpoint="/api/countries" idProperty="id" displayProperty="name" delay="10"></dile-select-ajax-overlay>
      `);

      await typeKeyword(el, 'sp');

      let changedDetail = null;
      let selectedTextDetail = null;
      el.addEventListener('element-changed', (e) => { changedDetail = e.detail; });
      el.addEventListener('dile-select-ajax-selected-text-changed', (e) => { selectedTextDetail = e.detail; });

      // options[0] is "Spain" (no default placeholder option in this component)
      await selectOption(el, 0);

      expect(el.value).toBe('1');
      expect(el.selectedText).toBe('Spain');
      expect(el.isSelected).toBe(true);
      expect(changedDetail.value).toBe('1');
      expect(selectedTextDetail.selectedText).toBe('Spain');
      // Selecting swaps to the read-only state, unmounting the nested dile-select-overlay entirely.
      expect(el.select).toBeNull();
      expect(el.opened).toBe(false);
    });

    it('keyboard flow (ArrowDown + Enter) forwarded to the nested dile-select-overlay selects a result', async () => {
      mockFetch([{ id: 1, name: 'Spain' }, { id: 2, name: 'France' }]);
      const el = await renderSelectAjaxOverlay(`
        <dile-select-ajax-overlay endpoint="/api/countries" idProperty="id" displayProperty="name" delay="10"></dile-select-ajax-overlay>
      `);

      await typeKeyword(el, 'sp');

      const input = el.shadowRoot.getElementById('search');
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      await wait(50);
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await el.updateComplete;

      expect(el.isSelected).toBe(true);
      expect(el.value).toBeTruthy();
    });

    it('shows the read-only field with the clear icon after selecting', async () => {
      mockFetch([{ id: 1, name: 'Spain' }]);
      const el = await renderSelectAjaxOverlay(`
        <dile-select-ajax-overlay endpoint="/api/countries" idProperty="id" displayProperty="name" delay="10"></dile-select-ajax-overlay>
      `);

      await typeKeyword(el, 'sp');
      await selectOption(el, 0);

      expect(el.shadowRoot.getElementById('result')).toBeTruthy();
      expect(el.shadowRoot.getElementById('search')).toBeNull();
    });

    it('clearing the selection returns to the search field', async () => {
      mockFetch([{ id: 1, name: 'Spain' }]);
      const el = await renderSelectAjaxOverlay(`
        <dile-select-ajax-overlay endpoint="/api/countries" idProperty="id" displayProperty="name" delay="10"></dile-select-ajax-overlay>
      `);

      await typeKeyword(el, 'sp');
      await selectOption(el, 0);

      el.shadowRoot.getElementById('result').dispatchEvent(new CustomEvent('dile-input-search-cleared', { bubbles: true }));
      await el.updateComplete;

      expect(el.isSelected).toBe(false);
      expect(el.value).toBeUndefined();
      expect(el.shadowRoot.getElementById('search')).toBeTruthy();
    });
  });

  describe('Form Association', () => {
    it('is form-associated and sets form value', async () => {
      const el = await renderSelectAjaxOverlay(`
        <dile-select-ajax-overlay endpoint="/api/countries" idProperty="id" displayProperty="name"></dile-select-ajax-overlay>
      `);

      expect(el.internals).toBeTruthy();

      el.value = '5';
      await el.updateComplete;
      expect(el.internals.form).toBeDefined();
    });
  });

  describe('Positioning', () => {
    it('points the nested dile-select-overlay at the real search field for positioning (not its own hidden trigger)', async () => {
      // Regression test: the nested popup's own trigger is a zero-height point sitting right
      // after the search field, so flipping "above" it doesn't leave room for the field's real
      // height and ends up covering it. The search field itself must be used as the anchor.
      const el = await renderSelectAjaxOverlay(`
        <dile-select-ajax-overlay endpoint="/api/countries" displayProperty="name"></dile-select-ajax-overlay>
      `);
      await el.select.updateComplete;

      expect(el.select.trigger).toBe(el.shadowRoot.querySelector('.search-wrapper'));
    });

    it('does not override the trigger in static mode, which uses its own visible trigger', async () => {
      mockFetch([{ id: 1, name: 'Spain' }]);
      const el = await renderSelectAjaxOverlay(`
        <dile-select-ajax-overlay endpoint="/api/countries" idProperty="id" displayProperty="name" static></dile-select-ajax-overlay>
      `);
      await wait(50);
      await el.updateComplete;
      await el.select.updateComplete;

      expect(el.select.trigger).toBe(el.select.shadowRoot.getElementById('trigger'));
    });

    it('rewires the trigger after clearing an initial value swaps in a fresh dile-select-overlay instance', async () => {
      // Regression test: a component initialized with `value` starts on the read-only state, so
      // the very first dile-select-overlay instance never survives (isSelected flips to true
      // inside firstUpdated(), tearing it down before it settles). Clearing the selection later
      // mounts a brand new instance that also needs the search-field wiring, not just the one
      // that happened to exist at firstUpdated() time.
      vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
        json: () => Promise.resolve({ data: { name: 'Spain' } }),
      })));
      const el = await renderSelectAjaxOverlay(`
        <dile-select-ajax-overlay endpoint="/api/countries" idProperty="id" displayProperty="name" resultDataProperty="data" value="22"></dile-select-ajax-overlay>
      `);
      await wait(50);
      await el.updateComplete;
      expect(el.isSelected).toBe(true);

      el.shadowRoot.getElementById('result').dispatchEvent(new CustomEvent('dile-input-search-cleared', { bubbles: true }));
      await el.updateComplete;
      await el.select.updateComplete;

      expect(el.select.trigger).toBe(el.shadowRoot.querySelector('.search-wrapper'));
    });
  });

  describe('static mode', () => {
    it('loads all data on init and renders it inline without requiring a search', async () => {
      mockFetch([{ id: 1, name: 'Spain' }, { id: 2, name: 'France' }]);
      const el = await renderSelectAjaxOverlay(`
        <dile-select-ajax-overlay endpoint="/api/countries" idProperty="id" displayProperty="name" static></dile-select-ajax-overlay>
      `);
      await wait(50);
      await el.updateComplete;

      expect(el.data.length).toBe(2);
      expect(el.select).toBeTruthy();
    });

    it('does not auto-select the first result once data loads (no default placeholder option)', async () => {
      // Regression test: without a default placeholder option, a native <select> defaults its
      // value to the first real option. dile-select-overlay's mount-time value sync would then
      // treat that as a genuine selection unless the nested component mounts before data (and
      // its options) exist, exactly like the search flow does.
      mockFetch([{ id: 1, name: 'Spain' }, { id: 2, name: 'France' }]);
      const el = await renderSelectAjaxOverlay(`
        <dile-select-ajax-overlay endpoint="/api/countries" idProperty="id" displayProperty="name" static></dile-select-ajax-overlay>
      `);
      await wait(50);
      await el.updateComplete;

      expect(el.isSelected).toBe(false);
      expect(el.value).toBeUndefined();
    });

    it('shows a visible, clickable trigger instead of hiding it (there is no separate search field to compose under)', async () => {
      mockFetch([{ id: 1, name: 'Spain' }, { id: 2, name: 'France' }]);
      const el = await renderSelectAjaxOverlay(`
        <dile-select-ajax-overlay endpoint="/api/countries" idProperty="id" displayProperty="name" static></dile-select-ajax-overlay>
      `);
      await wait(50);
      await el.updateComplete;

      expect(el.select.hideTrigger).toBe(false);
      const trigger = el.select.shadowRoot.getElementById('trigger');
      expect(trigger.getAttribute('tabindex')).toBe('0');

      trigger.click();
      await wait(100);
      expect(el.select.opened).toBe(true);
    });
  });
});
