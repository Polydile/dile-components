import { describe, it, expect, afterEach } from 'vitest';
import { CrudConfigBuilder } from '../../lib/CrudConfigBuilder.js';
import './crud-data-grid.js';
import '@dile/ui/components/data-grid/data-grid.js';

describe('dile-crud-data-grid', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  const sampleColumns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
  ];

  const sampleItems = [
    { id: 1, name: 'Item A' },
    { id: 2, name: 'Item B', deleted_at: '2026-01-01' },
  ];

  async function createGrid(customConfig = {}, props = {}) {
    const config = new CrudConfigBuilder('https://example.test/api/items', customConfig).getConfig();
    const el = document.createElement('dile-crud-data-grid');
    el.config = config;
    el.items = props.items ?? sampleItems;
    el.selectedIds = props.selectedIds ?? [];
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  function innerGrid(el) {
    return el.shadowRoot.querySelector('dile-data-grid');
  }

  it('builds columns from config.grid.columns and auto-appends an Actions column by default', async () => {
    const el = await createGrid({ grid: { columns: sampleColumns } });

    expect(el.columns.length).toBe(3);
    expect(el.columns[0]).toEqual(sampleColumns[0]);
    expect(el.columns[1]).toEqual(sampleColumns[1]);
    expect(el.columns[2].header).toBe('Actions');
    expect(el.columns[2].align).toBe('right');
    expect(el.columns[2].width).toBe('110px');
    expect(el.columns[2].hideCardLabel).toBe(true);
  });

  it('does not append an Actions column when config.grid.hideActionsColumn is true', async () => {
    const el = await createGrid({ grid: { columns: sampleColumns, hideActionsColumn: true } });

    expect(el.columns.length).toBe(2);
  });

  it('does not append an Actions column when actions are globally disabled', async () => {
    const el = await createGrid({
      grid: { columns: sampleColumns },
      customization: { disableListActions: true },
    });

    expect(el.columns.length).toBe(2);
  });

  it('honors actionsColumnHeader, actionsColumnWidth and actionsColumnAlign overrides', async () => {
    const el = await createGrid({
      grid: {
        columns: sampleColumns,
        actionsColumnHeader: 'Ops',
        actionsColumnWidth: '150px',
        actionsColumnAlign: 'center',
      },
    });

    const actionsColumn = el.columns[el.columns.length - 1];
    expect(actionsColumn.header).toBe('Ops');
    expect(actionsColumn.width).toBe('150px');
    expect(actionsColumn.align).toBe('center');
  });

  it('falls back to config.labels.actionsHeader when grid.actionsColumnHeader is not set', async () => {
    const el = await createGrid({
      grid: { columns: sampleColumns },
      labels: { actionsHeader: 'Manage' },
    });

    const actionsColumn = el.columns[el.columns.length - 1];
    expect(actionsColumn.header).toBe('Manage');
  });

  it('renders dile-crud-item-actions in the Actions column wired with .item and .config', async () => {
    const el = await createGrid({ grid: { columns: sampleColumns } });

    const grid = innerGrid(el);
    const actionsElements = grid.shadowRoot.querySelectorAll('dile-crud-item-actions');
    expect(actionsElements.length).toBe(sampleItems.length);
    expect(actionsElements[0].item).toEqual(sampleItems[0]);
    expect(actionsElements[0].config).toBe(el.config);
  });

  it('derives selectable from !config.customization.hideCheckboxSelection by default', async () => {
    const elHidden = await createGrid({ grid: { columns: sampleColumns }, customization: { hideCheckboxSelection: true } });
    expect(innerGrid(elHidden).selectable).toBe(false);

    const elShown = await createGrid({ grid: { columns: sampleColumns }, customization: { hideCheckboxSelection: false } });
    expect(innerGrid(elShown).selectable).toBe(true);
  });

  it('lets config.grid.selectable override the customization.hideCheckboxSelection default', async () => {
    const elForcedOff = await createGrid({
      grid: { columns: sampleColumns, selectable: false },
      customization: { hideCheckboxSelection: false },
    });
    expect(innerGrid(elForcedOff).selectable).toBe(false);

    const elForcedOn = await createGrid({
      grid: { columns: sampleColumns, selectable: true },
      customization: { hideCheckboxSelection: true },
    });
    expect(innerGrid(elForcedOn).selectable).toBe(true);
  });

  it('forwards stickyFirstColumn, striped, responsiveMode and emptyMessage with sensible defaults', async () => {
    const elDefaults = await createGrid({ grid: { columns: sampleColumns } });
    const gridDefaults = innerGrid(elDefaults);
    expect(gridDefaults.stickyFirstColumn).toBe(true);
    expect(gridDefaults.striped).toBe(true);
    expect(gridDefaults.responsiveMode).toBe('auto');
    expect(gridDefaults.emptyMessage).toBe('No data available');

    const elOverrides = await createGrid({
      grid: {
        columns: sampleColumns,
        stickyFirstColumn: false,
        striped: false,
        responsiveMode: 'cards',
        emptyMessage: 'Nothing here',
      },
    });
    const gridOverrides = innerGrid(elOverrides);
    expect(gridOverrides.stickyFirstColumn).toBe(false);
    expect(gridOverrides.striped).toBe(false);
    expect(gridOverrides.responsiveMode).toBe('cards');
    expect(gridOverrides.emptyMessage).toBe('Nothing here');
  });

  it('always forces sort-mode to external regardless of config', async () => {
    const el = await createGrid({ grid: { columns: sampleColumns } });
    expect(innerGrid(el).sortMode).toBe('external');
  });

  it('wires computeRowId from config.computeItemId so selection matches custom ids', async () => {
    const el = await createGrid(
      {
        grid: { columns: sampleColumns, selectable: true },
        computeItemId: (item) => `custom-${item.id}`,
      },
      { selectedIds: ['custom-2'] }
    );

    const checkboxes = innerGrid(el).shadowRoot.querySelectorAll('dile-checkbox');
    expect(checkboxes[0].checked).toBe(false);
    expect(checkboxes[1].checked).toBe(true);
  });

  it('leaves computeRowId unset when config.computeItemId is not a function', async () => {
    const el = document.createElement('dile-crud-data-grid');
    el.config = { grid: { columns: sampleColumns } };
    el.items = sampleItems;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.computeRowId).toBeNull();
  });

  it('applies the is-deleted row class to rows whose deleted_at is truthy', async () => {
    const el = await createGrid({ grid: { columns: sampleColumns } });

    const rows = innerGrid(el).shadowRoot.querySelectorAll('tbody tr');
    expect(rows[0].classList.contains('is-deleted')).toBe(false);
    expect(rows[1].classList.contains('is-deleted')).toBe(true);
  });

  it('does not throw and still appends the Actions column when config is null', async () => {
    const el = document.createElement('dile-crud-data-grid');
    el.items = sampleItems;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.columns.length).toBe(1);
    expect(el.columns[0].header).toBe('Actions');
    expect(innerGrid(el)).toBeTruthy();
  });
});
