import { describe, it, expect, afterEach, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import './crud-select-all.js';

async function createSelectAll({ numItems, pageSize = 25, maxBatchActionItems, disablePagination = false, selectedCount = 0 }) {
  const el = document.createElement('dile-crud-select-all');
  el.language = 'en';
  el.numItems = numItems;
  el.pageSize = pageSize;
  el.maxBatchActionItems = maxBatchActionItems;
  el.disablePagination = disablePagination;
  el.selectedCount = selectedCount;
  document.body.appendChild(el);
  await vi.waitFor(() => expect(el.translations.select_matching).toBeTruthy());
  await el.updateComplete;
  return el;
}

function options(el) {
  return [...el.shadowRoot.querySelectorAll('.option:not(.clear)')];
}

describe('dile-crud-select-all limits', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('enables both options when the items are within the limit', async () => {
    const el = await createSelectAll({ numItems: 30, maxBatchActionItems: 50 });

    expect(options(el).map(option => option.classList.contains('disabled'))).toEqual([false, false]);
    expect(el.shadowRoot.querySelector('.limit')).toBeNull();
  });

  it('shows the matching option disabled with the reason when the items exceed the limit', async () => {
    const el = await createSelectAll({ numItems: 120, maxBatchActionItems: 50 });

    const [page, matching] = options(el);
    expect(page.classList.contains('disabled')).toBe(false);
    expect(matching.classList.contains('disabled')).toBe(true);
    expect(matching.getAttribute('aria-disabled')).toBe('true');
    expect(page.querySelector('.limit')).toBeNull();
    expect(matching.querySelector('.limit').textContent).toBe('Filter the list: up to 50 items per action.');
  });

  it('does not select when clicking a disabled option', async () => {
    const el = await createSelectAll({ numItems: 120, maxBatchActionItems: 50 });
    let dispatched = false;
    el.addEventListener('crud-select-all', () => { dispatched = true; });

    options(el)[1].click();

    expect(dispatched).toBe(false);
    expect(el.allChecked).toBeFalsy();
  });

  it('disables the page option when the page size exceeds the limit', async () => {
    const el = await createSelectAll({ numItems: 200, pageSize: 100, maxBatchActionItems: 50 });

    const [page, matching] = options(el);
    expect(page.classList.contains('disabled')).toBe(true);
    expect(page.querySelector('.limit').textContent).toBe('Reduce the page size: up to 50 items per action.');
    expect(matching.querySelector('.limit').textContent).toBe('Filter the list: up to 50 items per action.');
  });

  it('keeps the selector visible without pagination and over the limit', async () => {
    const el = await createSelectAll({ numItems: 80, maxBatchActionItems: 50, disablePagination: true });

    expect(options(el).length).toBe(1);
    expect(options(el)[0].classList.contains('disabled')).toBe(true);
  });

  it('has no limit when maxBatchActionItems is not set', async () => {
    const el = await createSelectAll({ numItems: 5000 });

    expect(options(el).some(option => option.classList.contains('disabled'))).toBe(false);
  });

  it('dispatches allChecked when selecting all matching items', async () => {
    const el = await createSelectAll({ numItems: 30, maxBatchActionItems: 50 });
    let detail = null;
    el.addEventListener('crud-select-all', (e) => { detail = e.detail; });

    options(el)[1].click();

    expect(detail).toEqual({ pageChecked: false, allChecked: true });
  });

  it('shows the clear selection option disabled when nothing is selected', async () => {
    const el = await createSelectAll({ numItems: 30, maxBatchActionItems: 50 });
    let dispatched = false;
    el.addEventListener('crud-select-all', () => { dispatched = true; });

    const clear = el.shadowRoot.querySelector('.clear');
    expect(clear.classList.contains('disabled')).toBe(true);
    expect(clear.getAttribute('aria-disabled')).toBe('true');
    clear.click();

    expect(dispatched).toBe(false);
  });

  it('clears the selection and unchecks the options', async () => {
    const el = await createSelectAll({ numItems: 30, maxBatchActionItems: 50, selectedCount: 30 });
    options(el)[1].click();
    let detail = null;
    el.addEventListener('crud-select-all', (e) => { detail = e.detail; });

    const clear = el.shadowRoot.querySelector('.clear');
    expect(clear.textContent).toContain('Clear selection (30)');
    clear.click();

    expect(detail).toEqual({ pageChecked: false, allChecked: false });
    expect(el.allChecked).toBe(false);
    expect(el.mainChecked).toBe(false);
  });
});

describe('dile-crud-select-all keyboard access', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  async function openWithKeyboard(el) {
    const trigger = el.shadowRoot.querySelector('dile-button-icon');
    await trigger.updateComplete;
    trigger.shadowRoot.querySelector('button').focus();
    await userEvent.keyboard('{Enter}');
    await wait(100);
  }

  function focusedOption(el) {
    return el.shadowRoot.activeElement;
  }

  it('renders the options as native buttons with their checked state', async () => {
    const el = await createSelectAll({ numItems: 30, maxBatchActionItems: 50 });
    options(el)[0].click();
    await el.updateComplete;

    const buttons = [...el.shadowRoot.querySelectorAll('.option')];
    expect(buttons.map(button => button.tagName)).toEqual(['BUTTON', 'BUTTON', 'BUTTON']);
    expect(buttons.map(button => button.getAttribute('aria-pressed'))).toEqual(['true', 'false', null]);
  });

  it('reaches the options with Tab and activates them with Enter and Space', async () => {
    const el = await createSelectAll({ numItems: 30, maxBatchActionItems: 50, selectedCount: 5 });
    const details = [];
    el.addEventListener('crud-select-all', (e) => { details.push(e.detail); });

    await openWithKeyboard(el);
    await userEvent.keyboard('{Tab}');
    expect(focusedOption(el)).toBe(options(el)[0]);
    await userEvent.keyboard('{Enter}');

    await userEvent.keyboard('{Tab}');
    expect(focusedOption(el)).toBe(options(el)[1]);
    await userEvent.keyboard(' ');

    await userEvent.keyboard('{Tab}');
    expect(focusedOption(el)).toBe(el.shadowRoot.querySelector('.clear'));
    await userEvent.keyboard('{Enter}');

    expect(details).toEqual([
      { pageChecked: true, allChecked: false },
      { pageChecked: false, allChecked: true },
      { pageChecked: false, allChecked: false },
    ]);
  });

  it('keeps disabled options focusable, so the limit message is reachable, without selecting', async () => {
    const el = await createSelectAll({ numItems: 120, maxBatchActionItems: 50 });
    let dispatched = false;
    el.addEventListener('crud-select-all', () => { dispatched = true; });

    await openWithKeyboard(el);
    await userEvent.keyboard('{Tab}');
    await userEvent.keyboard('{Tab}');
    expect(focusedOption(el)).toBe(options(el)[1]);
    await userEvent.keyboard('{Enter}');

    expect(dispatched).toBe(false);
    expect(el.allChecked).toBeFalsy();
  });
});
