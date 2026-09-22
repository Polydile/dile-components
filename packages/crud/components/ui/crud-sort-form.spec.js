import { describe, it, expect, afterEach } from 'vitest';
import './crud-sort-form.js';

describe('dile-crud-sort-form', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  const sortOptions = [
    { name: 'name', label: 'Name', direction: 'asc' },
    { name: 'id', label: 'Id', direction: 'asc' },
  ];

  async function createSortForm(props = {}) {
    const el = document.createElement('dile-crud-sort-form');
    el.sortOptions = props.sortOptions ?? sortOptions;
    if (props.sortField !== undefined) {
      el.sortField = props.sortField;
    }
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  it('renders one radio/order-switch pair per configured sort option', async () => {
    const el = await createSortForm();
    expect(el.shadowRoot.querySelectorAll('dile-radio').length).toBe(2);
    expect(el.shadowRoot.querySelectorAll('dile-order-switch').length).toBe(2);
  });

  it('getDirection returns the configured direction for a known field', async () => {
    const el = await createSortForm();
    await el.shadowRoot.querySelector('dile-order-switch[name="name"]').updateComplete;
    expect(el.getDirection('name')).toBe('asc');
  });

  it('getDirection returns undefined instead of throwing for a field with no matching order-switch', async () => {
    // Reproduces a DataGrid column marked sortable whose field isn't listed in config.sort.options.
    const el = await createSortForm();
    expect(() => el.getDirection('continent')).not.toThrow();
    expect(el.getDirection('continent')).toBeUndefined();
  });

  it('getDirection returns undefined for a falsy field without touching the DOM', async () => {
    const el = await createSortForm();
    expect(el.getDirection(null)).toBeUndefined();
    expect(el.getDirection('')).toBeUndefined();
  });

  // "year" has a static configured direction of "desc" so it can expose the regression:
  // syncing an "asc" sort must not get silently corrected back to "desc".
  const yearOptions = [{ name: 'year', label: 'Year', direction: 'desc' }];

  it('syncSort reflects an externally-applied sort without re-dispatching sort-changed', async () => {
    const el = await createSortForm({ sortOptions: yearOptions });

    let dispatchCount = 0;
    el.addEventListener('sort-changed', () => { dispatchCount++; });

    el.syncSort('year', 'asc');
    await el.updateComplete;

    expect(el.sortField).toBe('year');
    expect(el.sortDirection).toBe('asc');
    expect(dispatchCount).toBe(0);
  });

  it('a genuine radio-group selection (not preceded by syncSort) still defaults to the option configured direction', async () => {
    const el = await createSortForm({ sortOptions: yearOptions });

    let receivedDetail = null;
    el.addEventListener('sort-changed', (e) => { receivedDetail = e.detail; });

    const radioGroup = el.shadowRoot.querySelector('dile-radio-group');
    radioGroup.dispatchEvent(new CustomEvent('dile-radio-group-changed', {
      detail: { name: 'selector', value: 'year' },
    }));
    await el.updateComplete;

    expect(el.sortField).toBe('year');
    expect(el.sortDirection).toBe('desc');
    expect(receivedDetail).toEqual({ sortField: 'year', sortDirection: 'desc' });
  });

  it('clicking the label of an inactive option switches to it using its own configured direction, without flipping it', async () => {
    const el = await createSortForm({
      sortOptions: [
        { name: 'name', label: 'Name', direction: 'asc' },
        { name: 'year', label: 'Year', direction: 'desc' },
      ],
      sortField: 'name',
    });
    el.sortDirection = 'asc';
    await el.updateComplete;

    let receivedDetail = null;
    el.addEventListener('sort-changed', (e) => { receivedDetail = e.detail; });

    el.shadowRoot.querySelector('dile-order-switch[name="year"]').shadowRoot.querySelector('span').click();
    await el.updateComplete;

    expect(el.sortField).toBe('year');
    expect(el.sortDirection).toBe('desc'); // year's own configured default, not flipped
    expect(receivedDetail).toEqual({ sortField: 'year', sortDirection: 'desc' });
  });

  it('clicking the label of the already-active option toggles its direction instead of doing nothing', async () => {
    // Reproduces the reported confusion: clicking "Name" again while already sorted by
    // name silently did nothing, because the label always re-announced the same value.
    const el = await createSortForm({
      sortOptions: [{ name: 'name', label: 'Name', direction: 'asc' }],
      sortField: 'name',
    });
    el.sortDirection = 'asc';
    await el.updateComplete;

    let receivedDetail = null;
    el.addEventListener('sort-changed', (e) => { receivedDetail = e.detail; });

    const label = () => el.shadowRoot.querySelector('dile-order-switch[name="name"]').shadowRoot.querySelector('span');

    label().click();
    await el.updateComplete;
    expect(el.sortField).toBe('name');
    expect(el.sortDirection).toBe('desc'); // toggled, not a no-op
    expect(receivedDetail).toEqual({ sortField: 'name', sortDirection: 'desc' });

    label().click();
    await el.updateComplete;
    expect(el.sortDirection).toBe('asc'); // toggles back on a second click
  });
});
