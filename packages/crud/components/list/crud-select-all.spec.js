import { describe, it, expect, afterEach, vi } from 'vitest';
import './crud-select-all.js';

async function createSelectAll({ numItems, pageSize = 25, maxBatchActionItems, disablePagination = false }) {
  const el = document.createElement('dile-crud-select-all');
  el.language = 'en';
  el.numItems = numItems;
  el.pageSize = pageSize;
  el.maxBatchActionItems = maxBatchActionItems;
  el.disablePagination = disablePagination;
  document.body.appendChild(el);
  await vi.waitFor(() => expect(el.translations.select_matching).toBeTruthy());
  await el.updateComplete;
  return el;
}

function options(el) {
  return [...el.shadowRoot.querySelectorAll('.option')];
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
    expect(el.shadowRoot.querySelector('.limit').textContent).toContain('120');
    expect(el.shadowRoot.querySelector('.limit').textContent).toContain('50');
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

    expect(options(el)[0].classList.contains('disabled')).toBe(true);
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
});
