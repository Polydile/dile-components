import { html, css, LitElement } from 'lit';
import { arrowDropUpIcon, arrowDropDownIcon } from '@dile/icons';

export class DileDataGrid extends LitElement {
  static get properties() {
    return {
      /** Array of row objects to display in the grid */
      items: { type: Array },

      /** Column configurations: { field, header, sortable, width, align, render, comparator } */
      columns: { type: Array },

      /** Currently sorted column field */
      sortField: { type: String },

      /** Sort direction: 'asc', 'desc', or '' */
      sortDirection: { type: String },

      /** Mode of sorting: 'client' (sorts data internally) or 'external' (only emits event) */
      sortMode: { type: String },

      /** Message to display when there are no items */
      emptyMessage: { type: String },

      /** Unique property name for identifying rows */
      rowIdField: { type: String },

      /** Enables striped rows styling */
      striped: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.items = [];
    this.columns = [];
    this.sortField = '';
    this.sortDirection = '';
    this.sortMode = 'client';
    this.emptyMessage = 'No data available';
    this.rowIdField = 'id';
    this.striped = false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
        box-sizing: border-box;
        font-family: var(--dile-data-grid-font-family, inherit);
      }

      *, *::before, *::after {
        box-sizing: border-box;
      }

      .table-container {
        width: 100%;
        overflow-x: auto;
        background-color: var(--dile-data-grid-background-color, #ffffff);
        border: var(--dile-data-grid-border, 1px solid #e2e8f0);
        border-radius: var(--dile-data-grid-border-radius, 6px);
      }

      table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
      }

      thead {
        background-color: var(--dile-data-grid-header-background-color, #f8fafc);
        border-bottom: var(--dile-data-grid-header-border-bottom, 2px solid #e2e8f0);
      }

      th {
        padding: var(--dile-data-grid-header-padding, 0.75rem 1rem);
        color: var(--dile-data-grid-header-color, #334155);
        font-weight: var(--dile-data-grid-header-font-weight, 600);
        font-size: var(--dile-data-grid-header-font-size, 0.875rem);
        user-select: none;
        white-space: nowrap;
      }

      th.sortable {
        cursor: pointer;
        transition: background-color 0.15s ease-in-out;
      }

      th.sortable:hover {
        background-color: var(--dile-data-grid-header-hover-background-color, #f1f5f9);
      }

      .header-content {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
      }

      .sort-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.1rem;
        height: 1.1rem;
        color: var(--dile-data-grid-sort-icon-color, #94a3b8);
      }

      .sort-icon.active {
        color: var(--dile-data-grid-sort-icon-active-color, #2563eb);
      }

      .sort-icon svg {
        width: 100%;
        height: 100%;
        fill: currentColor;
      }

      tbody tr {
        border-bottom: var(--dile-data-grid-row-border-bottom, 1px solid #f1f5f9);
        transition: background-color 0.15s ease-in-out;
      }

      tbody tr:last-child {
        border-bottom: none;
      }

      tbody tr:hover {
        background-color: var(--dile-data-grid-row-hover-background-color, #f8fafc);
      }

      :host([striped]) tbody tr:nth-child(even),
      .striped tbody tr:nth-child(even) {
        background-color: var(--dile-data-grid-row-striped-background-color, #fcfdfe);
      }

      :host([striped]) tbody tr:nth-child(even):hover,
      .striped tbody tr:nth-child(even):hover {
        background-color: var(--dile-data-grid-row-hover-background-color, #f8fafc);
      }

      td {
        padding: var(--dile-data-grid-row-padding, 0.75rem 1rem);
        color: var(--dile-data-grid-row-color, #1e293b);
        font-size: var(--dile-data-grid-row-font-size, 0.875rem);
        vertical-align: middle;
      }

      .align-left {
        text-align: left;
      }

      .align-center {
        text-align: center;
      }

      .align-right {
        text-align: right;
      }

      .empty-cell {
        text-align: center;
        padding: var(--dile-data-grid-empty-padding, 2.5rem 1rem);
        color: var(--dile-data-grid-empty-color, #64748b);
        font-size: var(--dile-data-grid-empty-font-size, 0.875rem);
      }
    `;
  }

  get displayedItems() {
    if (!this.items || !Array.isArray(this.items)) {
      return [];
    }

    if (this.sortMode !== 'client' || !this.sortField || !this.sortDirection) {
      return this.items;
    }

    const column = (this.columns || []).find((col) => col.field === this.sortField);
    const directionFactor = this.sortDirection === 'desc' ? -1 : 1;

    return [...this.items].sort((a, b) => {
      const valA = a ? a[this.sortField] : undefined;
      const valB = b ? b[this.sortField] : undefined;

      if (column && typeof column.comparator === 'function') {
        return directionFactor * column.comparator(valA, valB, a, b);
      }

      // Safe fallback comparisons
      if (valA === undefined || valA === null) {
        return valB === undefined || valB === null ? 0 : 1;
      }
      if (valB === undefined || valB === null) {
        return -1;
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        return directionFactor * valA.localeCompare(valB, undefined, { numeric: true, sensitivity: 'base' });
      }

      if (valA < valB) return -1 * directionFactor;
      if (valA > valB) return 1 * directionFactor;
      return 0;
    });
  }

  render() {
    const items = this.displayedItems;
    const cols = this.columns || [];

    return html`
      <div class="table-container ${this.striped ? 'striped' : ''}">
        <table>
          <thead>
            <tr>
              ${cols.map((col) => this._renderHeaderCell(col))}
            </tr>
          </thead>
          <tbody>
            ${items.length === 0
              ? html`
                  <tr class="empty-row">
                    <td class="empty-cell" colspan="${cols.length || 1}">
                      ${this.emptyMessage}
                    </td>
                  </tr>
                `
              : items.map((row, rowIndex) => this._renderRow(row, rowIndex, cols))}
          </tbody>
        </table>
      </div>
    `;
  }

  _renderHeaderCell(column) {
    const isSorted = this.sortField === column.field && !!this.sortDirection;
    const alignClass = column.align ? `align-${column.align}` : 'align-left';
    const sortableClass = column.sortable ? 'sortable' : '';
    const styleWidth = column.width ? `width: ${column.width};` : '';

    return html`
      <th
        class="${alignClass} ${sortableClass}"
        style="${styleWidth}"
        @click=${() => this._handleHeaderClick(column)}
        aria-sort="${isSorted ? (this.sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}"
      >
        <div class="header-content">
          <span>${column.header || column.field || ''}</span>
          ${column.sortable ? this._renderSortIcon(column) : ''}
        </div>
      </th>
    `;
  }

  _renderSortIcon(column) {
    const isSorted = this.sortField === column.field && !!this.sortDirection;
    if (!isSorted) {
      return html`<span class="sort-icon" aria-hidden="true"></span>`;
    }

    const icon = this.sortDirection === 'asc' ? arrowDropUpIcon : arrowDropDownIcon;

    return html`
      <span class="sort-icon active" aria-hidden="true">
        ${icon}
      </span>
    `;
  }

  _renderRow(row, rowIndex, columns) {
    return html`
      <tr @click=${(e) => this._handleRowClick(row, rowIndex, e)}>
        ${columns.map((col) => this._renderCell(row, rowIndex, col))}
      </tr>
    `;
  }

  _renderCell(row, rowIndex, column) {
    const alignClass = column.align ? `align-${column.align}` : 'align-left';

    let content;
    if (typeof column.render === 'function') {
      content = column.render(row, rowIndex, column);
    } else if (column.field && row && row[column.field] !== undefined) {
      content = row[column.field];
    } else {
      content = '';
    }

    return html`<td class="${alignClass}">${content}</td>`;
  }

  _handleHeaderClick(column) {
    if (!column.sortable || !column.field) {
      return;
    }

    let nextDirection = 'asc';
    if (this.sortField === column.field) {
      if (this.sortDirection === 'asc') {
        nextDirection = 'desc';
      } else if (this.sortDirection === 'desc') {
        nextDirection = '';
      } else {
        nextDirection = 'asc';
      }
    }

    this.sortField = nextDirection ? column.field : '';
    this.sortDirection = nextDirection;

    this.dispatchEvent(
      new CustomEvent('dile-data-grid-sort', {
        bubbles: true,
        composed: true,
        detail: {
          field: this.sortField,
          direction: this.sortDirection,
          column,
        },
      })
    );
  }

  _handleRowClick(row, index, event) {
    this.dispatchEvent(
      new CustomEvent('dile-data-grid-row-click', {
        bubbles: true,
        composed: true,
        detail: {
          row,
          index,
          event,
        },
      })
    );
  }
}
