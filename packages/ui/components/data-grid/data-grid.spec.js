import { describe, it, expect, afterEach } from 'vitest';
import { html } from 'lit';
import './data-grid.js';

describe('dile-data-grid', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function createDataGrid(props = {}) {
    const el = document.createElement('dile-data-grid');
    Object.assign(el, props);
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  const sampleColumns = [
    { field: 'id', header: 'ID', sortable: true, width: '80px', align: 'center' },
    { field: 'name', header: 'Name', sortable: true },
    { field: 'age', header: 'Age', sortable: true, align: 'right' },
    {
      header: 'Custom',
      render: (row) => html`<span class="custom-badge">${row.name} (${row.age})</span>`,
    },
  ];

  const sampleItems = [
    { id: 1, name: 'Carlos', age: 30 },
    { id: 2, name: 'Ana', age: 25 },
    { id: 3, name: 'Beatriz', age: 35 },
  ];

  it('renders default empty message when items is empty', async () => {
    const el = await createDataGrid({ columns: sampleColumns, items: [] });
    const emptyCell = el.shadowRoot.querySelector('.empty-cell');
    expect(emptyCell).toBeTruthy();
    expect(emptyCell.textContent.trim()).toBe('No data available');
  });

  it('renders customized empty message', async () => {
    const el = await createDataGrid({
      columns: sampleColumns,
      items: [],
      emptyMessage: 'Nothing found',
    });
    const emptyCell = el.shadowRoot.querySelector('.empty-cell');
    expect(emptyCell.textContent.trim()).toBe('Nothing found');
  });

  it('renders column headers and data rows correctly', async () => {
    const el = await createDataGrid({
      columns: sampleColumns,
      items: sampleItems,
    });

    const headers = el.shadowRoot.querySelectorAll('th');
    expect(headers.length).toBe(4);
    expect(headers[0].textContent).toContain('ID');
    expect(headers[1].textContent).toContain('Name');
    expect(headers[2].textContent).toContain('Age');
    expect(headers[3].textContent).toContain('Custom');

    const rows = el.shadowRoot.querySelectorAll('tbody tr');
    expect(rows.length).toBe(3);

    const firstRowCells = rows[0].querySelectorAll('td');
    expect(firstRowCells[0].textContent.trim()).toBe('1');
    expect(firstRowCells[1].textContent.trim()).toBe('Carlos');
    expect(firstRowCells[2].textContent.trim()).toBe('30');
    expect(firstRowCells[3].querySelector('.custom-badge')).toBeTruthy();
    expect(firstRowCells[3].textContent.trim()).toBe('Carlos (30)');
  });

  it('sorts strings ascending and descending on client sortMode', async () => {
    const el = await createDataGrid({
      columns: sampleColumns,
      items: sampleItems,
      sortMode: 'client',
    });

    const nameHeader = el.shadowRoot.querySelectorAll('th')[1];

    // Click 1: sort asc by name
    nameHeader.click();
    await el.updateComplete;

    let rows = el.shadowRoot.querySelectorAll('tbody tr');
    expect(rows[0].querySelectorAll('td')[1].textContent.trim()).toBe('Ana');
    expect(rows[1].querySelectorAll('td')[1].textContent.trim()).toBe('Beatriz');
    expect(rows[2].querySelectorAll('td')[1].textContent.trim()).toBe('Carlos');

    // Click 2: sort desc by name
    nameHeader.click();
    await el.updateComplete;

    rows = el.shadowRoot.querySelectorAll('tbody tr');
    expect(rows[0].querySelectorAll('td')[1].textContent.trim()).toBe('Carlos');
    expect(rows[1].querySelectorAll('td')[1].textContent.trim()).toBe('Beatriz');
    expect(rows[2].querySelectorAll('td')[1].textContent.trim()).toBe('Ana');

    // Click 3: reset sort
    nameHeader.click();
    await el.updateComplete;

    rows = el.shadowRoot.querySelectorAll('tbody tr');
    expect(rows[0].querySelectorAll('td')[1].textContent.trim()).toBe('Carlos');
    expect(rows[1].querySelectorAll('td')[1].textContent.trim()).toBe('Ana');
    expect(rows[2].querySelectorAll('td')[1].textContent.trim()).toBe('Beatriz');
  });

  it('sorts numbers properly in client mode', async () => {
    const el = await createDataGrid({
      columns: sampleColumns,
      items: sampleItems,
      sortMode: 'client',
    });

    const ageHeader = el.shadowRoot.querySelectorAll('th')[2];

    // Click: sort asc by age
    ageHeader.click();
    await el.updateComplete;

    let rows = el.shadowRoot.querySelectorAll('tbody tr');
    expect(rows[0].querySelectorAll('td')[2].textContent.trim()).toBe('25');
    expect(rows[1].querySelectorAll('td')[2].textContent.trim()).toBe('30');
    expect(rows[2].querySelectorAll('td')[2].textContent.trim()).toBe('35');

    // Click: sort desc by age
    ageHeader.click();
    await el.updateComplete;

    rows = el.shadowRoot.querySelectorAll('tbody tr');
    expect(rows[0].querySelectorAll('td')[2].textContent.trim()).toBe('35');
    expect(rows[1].querySelectorAll('td')[2].textContent.trim()).toBe('30');
    expect(rows[2].querySelectorAll('td')[2].textContent.trim()).toBe('25');
  });

  it('supports custom column comparators', async () => {
    const customColumns = [
      {
        field: 'date',
        header: 'Date',
        sortable: true,
        comparator: (valA, valB) => new Date(valA).getTime() - new Date(valB).getTime(),
      },
    ];
    const items = [
      { date: '2026-05-10' },
      { date: '2025-01-01' },
      { date: '2026-01-15' },
    ];

    const el = await createDataGrid({
      columns: customColumns,
      items,
      sortMode: 'client',
    });

    const dateHeader = el.shadowRoot.querySelector('th');
    dateHeader.click();
    await el.updateComplete;

    let rows = el.shadowRoot.querySelectorAll('tbody tr');
    expect(rows[0].querySelector('td').textContent.trim()).toBe('2025-01-01');
    expect(rows[1].querySelector('td').textContent.trim()).toBe('2026-01-15');
    expect(rows[2].querySelector('td').textContent.trim()).toBe('2026-05-10');
  });

  it('dispatches dile-data-grid-sort event on header click', async () => {
    const el = await createDataGrid({
      columns: sampleColumns,
      items: sampleItems,
    });

    let sortEventDetail = null;
    el.addEventListener('dile-data-grid-sort', (e) => {
      sortEventDetail = e.detail;
    });

    const nameHeader = el.shadowRoot.querySelectorAll('th')[1];
    nameHeader.click();

    expect(sortEventDetail).toBeTruthy();
    expect(sortEventDetail.field).toBe('name');
    expect(sortEventDetail.direction).toBe('asc');
    expect(sortEventDetail.column.field).toBe('name');
  });

  it('dispatches dile-data-grid-row-click event on row click', async () => {
    const el = await createDataGrid({
      columns: sampleColumns,
      items: sampleItems,
    });

    let rowClickDetail = null;
    el.addEventListener('dile-data-grid-row-click', (e) => {
      rowClickDetail = e.detail;
    });

    const secondRow = el.shadowRoot.querySelectorAll('tbody tr')[1];
    secondRow.click();

    expect(rowClickDetail).toBeTruthy();
    expect(rowClickDetail.row.id).toBe(2);
    expect(rowClickDetail.row.name).toBe('Ana');
    expect(rowClickDetail.index).toBe(1);
  });

  it('does not re-order displayed items internally when sortMode is external', async () => {
    const el = await createDataGrid({
      columns: sampleColumns,
      items: sampleItems,
      sortMode: 'external',
    });

    const nameHeader = el.shadowRoot.querySelectorAll('th')[1];
    nameHeader.click();
    await el.updateComplete;

    // Items order should remain unchanged
    const rows = el.shadowRoot.querySelectorAll('tbody tr');
    expect(rows[0].querySelectorAll('td')[1].textContent.trim()).toBe('Carlos');
    expect(rows[1].querySelectorAll('td')[1].textContent.trim()).toBe('Ana');
    expect(rows[2].querySelectorAll('td')[1].textContent.trim()).toBe('Beatriz');
  });
});
