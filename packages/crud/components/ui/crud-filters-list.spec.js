import { describe, it, expect, afterEach } from 'vitest';
import './crud-filters-list.js';

async function renderList(filters) {
  const el = document.createElement('dile-crud-filters-list');
  el.filters = filters;
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

function chipLabels(el) {
  return Array.from(el.shadowRoot.querySelectorAll('dile-crud-filters-list-item'))
    .map(item => item.label);
}

const selectFilter = (extra = {}) => ({
  name: 'customerType',
  label: 'Customer type',
  type: 'select',
  active: true,
  value: 'company',
  options: [
    { value: 'person', label: 'Person' },
    { value: 'company', label: 'Company / Professional' },
  ],
  ...extra,
});

const selectAjaxFilter = (extra = {}) => ({
  name: 'tag',
  label: 'Tag',
  type: 'select_ajax',
  active: true,
  value: '2',
  endpoint: '/api/tags',
  ...extra,
});

describe('dile-crud-filters-list', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('shows the option label for select filters (unchanged behavior)', async () => {
    const el = await renderList([selectFilter()]);
    expect(chipLabels(el)).toEqual(['Company / Professional']);
  });

  it('shows the filter label for boolean filters (unchanged behavior)', async () => {
    const el = await renderList([{ name: 'essential', label: 'Is essential', type: 'boolean', active: true, value: true }]);
    expect(chipLabels(el)).toEqual(['Is essential']);
  });

  it('shows the valueLabel of a select_ajax filter', async () => {
    const el = await renderList([selectAjaxFilter({ valueLabel: 'Strategy' })]);
    expect(chipLabels(el)).toEqual(['Strategy']);
  });

  it('falls back to the filter label when the select_ajax valueLabel is unknown', async () => {
    const el = await renderList([selectAjaxFilter()]);
    expect(chipLabels(el)).toEqual(['Tag']);
  });

  it('renders "label: value" when showLabelInChip is enabled', async () => {
    const el = await renderList([
      selectFilter({ showLabelInChip: true }),
      selectAjaxFilter({ valueLabel: 'Strategy', showLabelInChip: true }),
    ]);
    expect(chipLabels(el)).toEqual(['Customer type: Company / Professional', 'Tag: Strategy']);
  });

  it('does not prefix the fallback label when showLabelInChip is enabled and the value label is unknown', async () => {
    const el = await renderList([selectAjaxFilter({ showLabelInChip: true })]);
    expect(chipLabels(el)).toEqual(['Tag']);
  });

  it('does not render inactive or hidden filters', async () => {
    const el = await renderList([
      selectAjaxFilter({ active: false, value: '' }),
      selectFilter({ hidden: true }),
    ]);
    expect(chipLabels(el)).toEqual([]);
  });
});
