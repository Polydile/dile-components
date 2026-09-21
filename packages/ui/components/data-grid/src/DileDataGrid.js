import { html, css, LitElement } from 'lit';
import { arrowDropUpIcon, arrowDropDownIcon } from '@dile/icons';
import '../../checkbox/checkbox.js';

export class DileDataGrid extends LitElement {
  static get properties() {
    return {
      /** Array of row objects to display in the grid */
      items: { type: Array },

      /** Column configurations: { field, header, sortable, width, align, render, comparator, hideOnCard, hideCardLabel, sticky } */
      columns: { type: Array },

      /** Currently sorted column field */
      sortField: { type: String },

      /** Sort direction: 'asc', 'desc', or '' */
      sortDirection: { type: String },

      /** Mode of sorting: 'client' (sorts data internally) or 'external' (only emits event) */
      sortMode: { type: String, attribute: 'sort-mode' },

      /** Responsive mode: 'auto' (container query card switch), 'cards' (always card), or 'scroll' (table scroll) */
      responsiveMode: { type: String, attribute: 'responsive-mode', reflect: true },

      /** Makes the first column sticky to the left */
      stickyFirstColumn: { type: Boolean, attribute: 'sticky-first-column' },

      /** Message to display when there are no items */
      emptyMessage: { type: String, attribute: 'empty-message' },

      /** Unique property name for identifying rows */
      rowIdField: { type: String },

      /** Enables striped rows styling */
      striped: { type: Boolean },

      /** Enables selection checkboxes column for batch operations */
      selectable: { type: Boolean },

      /** Array of selected row IDs */
      selectedIds: { type: Array },

      /** Optional function to compute row ID from a row object: (row) => string|number */
      computeRowId: { type: Function },

      /** Optional function to compute custom CSS class for a row: (row, index) => string */
      rowClass: { type: Function },
    };
  }

  constructor() {
    super();
    this.items = [];
    this.columns = [];
    this.sortField = '';
    this.sortDirection = '';
    this.sortMode = 'client';
    this.responsiveMode = 'auto';
    this.stickyFirstColumn = false;
    this.emptyMessage = 'No data available';
    this.rowIdField = 'id';
    this.striped = false;
    this.selectable = false;
    this.selectedIds = [];
    this.computeRowId = null;
    this.rowClass = null;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
        box-sizing: border-box;
        container-type: inline-size;
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

      tbody tr.is-deleted,
      tbody tr.deleted {
        opacity: var(--dile-data-grid-deleted-opacity, 0.6);
        background-color: var(--dile-data-grid-deleted-background-color, rgba(239, 68, 68, 0.04));
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

      /* Selection Checkbox Cell */
      th.selection-cell,
      td.selection-cell {
        width: var(--dile-data-grid-selection-width, 44px);
        min-width: var(--dile-data-grid-selection-width, 44px);
        max-width: var(--dile-data-grid-selection-width, 44px);
        text-align: center;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
      }

      td.selection-cell dile-checkbox {
        display: inline-flex;
        vertical-align: middle;
        --dile-checkbox-unchecked-color: var(--dile-data-grid-checkbox-unchecked-color, #888);
      }

      /* Sticky Columns */
      th.selection-cell.sticky-left,
      td.selection-cell.sticky-left {
        position: sticky;
        left: 0;
        z-index: 2;
        background-color: var(--dile-data-grid-sticky-background-color, var(--dile-data-grid-background-color, #ffffff));
      }

      th.selection-cell.sticky-left {
        z-index: 3;
        background-color: var(--dile-data-grid-sticky-header-background-color, var(--dile-data-grid-header-background-color, #f8fafc));
      }

      th.selection-cell.sticky-left.has-shadow,
      td.selection-cell.sticky-left.has-shadow {
        box-shadow: var(--dile-data-grid-sticky-shadow, 2px 0 5px -2px rgba(0, 0, 0, 0.12));
      }

      th.sticky-left,
      td.sticky-left {
        position: sticky;
        left: 0;
        z-index: 2;
        background-color: var(--dile-data-grid-sticky-background-color, var(--dile-data-grid-background-color, #ffffff));
        box-shadow: var(--dile-data-grid-sticky-shadow, 2px 0 5px -2px rgba(0, 0, 0, 0.12));
      }

      th.sticky-left {
        z-index: 3;
        background-color: var(--dile-data-grid-sticky-header-background-color, var(--dile-data-grid-header-background-color, #f8fafc));
      }

      th.sticky-left-after-selection,
      td.sticky-left-after-selection {
        position: sticky;
        left: var(--dile-data-grid-selection-width, 44px);
        z-index: 2;
        background-color: var(--dile-data-grid-sticky-background-color, var(--dile-data-grid-background-color, #ffffff));
        box-shadow: var(--dile-data-grid-sticky-shadow, 2px 0 5px -2px rgba(0, 0, 0, 0.12));
      }

      th.sticky-left-after-selection {
        z-index: 3;
        background-color: var(--dile-data-grid-sticky-header-background-color, var(--dile-data-grid-header-background-color, #f8fafc));
      }

      th.sticky-right,
      td.sticky-right {
        position: sticky;
        right: 0;
        z-index: 2;
        background-color: var(--dile-data-grid-sticky-background-color, var(--dile-data-grid-background-color, #ffffff));
        box-shadow: var(--dile-data-grid-sticky-right-shadow, -2px 0 5px -2px rgba(0, 0, 0, 0.12));
      }

      th.sticky-right {
        z-index: 3;
        background-color: var(--dile-data-grid-sticky-header-background-color, var(--dile-data-grid-header-background-color, #f8fafc));
      }

      :host([striped]) tbody tr:nth-child(even) td.sticky-left,
      .striped tbody tr:nth-child(even) td.sticky-left,
      :host([striped]) tbody tr:nth-child(even) td.sticky-left-after-selection,
      .striped tbody tr:nth-child(even) td.sticky-left-after-selection,
      :host([striped]) tbody tr:nth-child(even) td.selection-cell.sticky-left,
      .striped tbody tr:nth-child(even) td.selection-cell.sticky-left,
      :host([striped]) tbody tr:nth-child(even) td.sticky-right,
      .striped tbody tr:nth-child(even) td.sticky-right {
        background-color: var(--dile-data-grid-sticky-striped-background-color, var(--dile-data-grid-row-striped-background-color, #fcfdfe));
      }

      tbody tr:hover td.sticky-left,
      tbody tr:hover td.sticky-left-after-selection,
      tbody tr:hover td.selection-cell.sticky-left,
      tbody tr:hover td.sticky-right {
        background-color: var(--dile-data-grid-row-hover-background-color, #f8fafc);
      }

      /* Explicit Cards layout (responsive-mode="cards" / "card") */
      :host([responsive-mode="cards"]) .table-container,
      :host([responsive-mode="card"]) .table-container {
        background-color: transparent;
        border: none;
      }

      :host([responsive-mode="cards"]) thead,
      :host([responsive-mode="card"]) thead {
        display: none;
      }

      :host([responsive-mode="cards"]) table,
      :host([responsive-mode="cards"]) tbody,
      :host([responsive-mode="card"]) table,
      :host([responsive-mode="card"]) tbody {
        display: block;
        width: 100%;
      }

      :host([responsive-mode="cards"]) tbody tr,
      :host([responsive-mode="card"]) tbody tr {
        display: block;
        background-color: var(--dile-data-grid-card-background-color, #ffffff);
        border: var(--dile-data-grid-card-border, 1px solid #e2e8f0);
        border-radius: var(--dile-data-grid-card-border-radius, 8px);
        margin-bottom: var(--dile-data-grid-card-gap, 0.75rem);
        padding: var(--dile-data-grid-card-padding, 0.5rem 0);
        box-shadow: var(--dile-data-grid-card-box-shadow, 0 1px 3px rgba(0, 0, 0, 0.05));
      }

      :host([responsive-mode="cards"]) tbody tr:last-child,
      :host([responsive-mode="card"]) tbody tr:last-child {
        margin-bottom: 0;
      }

      :host([responsive-mode="cards"]) td,
      :host([responsive-mode="card"]) td {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--dile-data-grid-card-cell-padding, 0.5rem 1rem);
        border-bottom: var(--dile-data-grid-card-cell-border-bottom, 1px solid #f1f5f9);
        text-align: right;
        position: static;
        box-shadow: none;
      }

      :host([responsive-mode="cards"]) td.selection-cell,
      :host([responsive-mode="card"]) td.selection-cell {
        justify-content: flex-start;
        padding-top: 0.35rem;
        padding-bottom: 0.35rem;
        width: 100%;
        max-width: 100%;
      }

      :host([responsive-mode="cards"]) td.selection-cell::before,
      :host([responsive-mode="card"]) td.selection-cell::before {
        display: none !important;
      }

      :host([responsive-mode="cards"]) td:last-child,
      :host([responsive-mode="card"]) td:last-child {
        border-bottom: none;
      }

      :host([responsive-mode="cards"]) td.hide-on-card,
      :host([responsive-mode="card"]) td.hide-on-card {
        display: none !important;
      }

      :host([responsive-mode="cards"]) td::before,
      :host([responsive-mode="card"]) td::before {
        content: attr(data-label);
        font-weight: var(--dile-data-grid-card-label-font-weight, 600);
        color: var(--dile-data-grid-card-label-color, #64748b);
        font-size: var(--dile-data-grid-card-label-font-size, 0.8rem);
        text-align: left;
        margin-right: 1rem;
        flex-shrink: 0;
      }

      :host([responsive-mode="cards"]) td[data-label=""]::before,
      :host([responsive-mode="cards"]) td.no-card-label::before,
      :host([responsive-mode="card"]) td[data-label=""]::before,
      :host([responsive-mode="card"]) td.no-card-label::before {
        display: none;
      }

      :host([responsive-mode="cards"]) td[data-label=""],
      :host([responsive-mode="cards"]) td.no-card-label,
      :host([responsive-mode="card"]) td[data-label=""],
      :host([responsive-mode="card"]) td.no-card-label {
        justify-content: flex-end;
      }

      :host([responsive-mode="cards"]) .empty-cell,
      :host([responsive-mode="card"]) .empty-cell {
        display: block;
        text-align: center;
      }

      :host([responsive-mode="cards"]) .empty-cell::before,
      :host([responsive-mode="card"]) .empty-cell::before {
        display: none;
      }

      /* Container Query: responsive card transformation when container width <= 600px */
      @container (max-width: 600px) {
        :host(:not([responsive-mode="scroll"]):not([responsive-mode="cards"]):not([responsive-mode="card"])) .table-container {
          background-color: transparent;
          border: none;
        }

        :host(:not([responsive-mode="scroll"]):not([responsive-mode="cards"]):not([responsive-mode="card"])) thead {
          display: none;
        }

        :host(:not([responsive-mode="scroll"]):not([responsive-mode="cards"]):not([responsive-mode="card"])) table,
        :host(:not([responsive-mode="scroll"]):not([responsive-mode="cards"]):not([responsive-mode="card"])) tbody {
          display: block;
          width: 100%;
        }

        :host(:not([responsive-mode="scroll"]):not([responsive-mode="cards"]):not([responsive-mode="card"])) tbody tr {
          display: block;
          background-color: var(--dile-data-grid-card-background-color, #ffffff);
          border: var(--dile-data-grid-card-border, 1px solid #e2e8f0);
          border-radius: var(--dile-data-grid-card-border-radius, 8px);
          margin-bottom: var(--dile-data-grid-card-gap, 0.75rem);
          padding: var(--dile-data-grid-card-padding, 0.5rem 0);
          box-shadow: var(--dile-data-grid-card-box-shadow, 0 1px 3px rgba(0, 0, 0, 0.05));
        }

        :host(:not([responsive-mode="scroll"]):not([responsive-mode="cards"]):not([responsive-mode="card"])) tbody tr:last-child {
          margin-bottom: 0;
        }

        :host(:not([responsive-mode="scroll"]):not([responsive-mode="cards"]):not([responsive-mode="card"])) td {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--dile-data-grid-card-cell-padding, 0.5rem 1rem);
          border-bottom: var(--dile-data-grid-card-cell-border-bottom, 1px solid #f1f5f9);
          text-align: right;
          position: static;
          box-shadow: none;
        }

        :host(:not([responsive-mode="scroll"]):not([responsive-mode="cards"]):not([responsive-mode="card"])) td.selection-cell {
          justify-content: flex-start;
          padding-top: 0.35rem;
          padding-bottom: 0.35rem;
          width: 100%;
          max-width: 100%;
        }

        :host(:not([responsive-mode="scroll"]):not([responsive-mode="cards"]):not([responsive-mode="card"])) td.selection-cell::before {
          display: none !important;
        }

        :host(:not([responsive-mode="scroll"]):not([responsive-mode="cards"]):not([responsive-mode="card"])) td:last-child {
          border-bottom: none;
        }

        :host(:not([responsive-mode="scroll"]):not([responsive-mode="cards"]):not([responsive-mode="card"])) td.hide-on-card {
          display: none !important;
        }

        :host(:not([responsive-mode="scroll"]):not([responsive-mode="cards"]):not([responsive-mode="card"])) td::before {
          content: attr(data-label);
          font-weight: var(--dile-data-grid-card-label-font-weight, 600);
          color: var(--dile-data-grid-card-label-color, #64748b);
          font-size: var(--dile-data-grid-card-label-font-size, 0.8rem);
          text-align: left;
          margin-right: 1rem;
          flex-shrink: 0;
        }

        :host(:not([responsive-mode="scroll"]):not([responsive-mode="cards"]):not([responsive-mode="card"])) td[data-label=""]::before,
        :host(:not([responsive-mode="scroll"]):not([responsive-mode="cards"]):not([responsive-mode="card"])) td.no-card-label::before {
          display: none;
        }

        :host(:not([responsive-mode="scroll"]):not([responsive-mode="cards"]):not([responsive-mode="card"])) td[data-label=""],
        :host(:not([responsive-mode="scroll"]):not([responsive-mode="cards"]):not([responsive-mode="card"])) td.no-card-label {
          justify-content: flex-end;
        }

        :host(:not([responsive-mode="scroll"]):not([responsive-mode="cards"]):not([responsive-mode="card"])) .empty-cell {
          display: block;
          text-align: center;
        }

        :host(:not([responsive-mode="scroll"]):not([responsive-mode="cards"]):not([responsive-mode="card"])) .empty-cell::before {
          display: none;
        }
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

  _getRowId(row) {
    if (!row) return undefined;
    if (typeof this.computeRowId === 'function') {
      return this.computeRowId(row);
    }
    return row[this.rowIdField];
  }

  _isRowSelected(row) {
    if (!this.selectedIds || !Array.isArray(this.selectedIds)) {
      return false;
    }
    const rowId = this._getRowId(row);
    const stringIds = this.selectedIds.map(String);
    return stringIds.includes(String(rowId));
  }

  _getStickyLeftClass(column, colIndex) {
    const isSticky = column.sticky === true || column.sticky === 'left' || (this.stickyFirstColumn && colIndex === 0);
    if (!isSticky) {
      return '';
    }
    if (this.selectable) {
      return 'sticky-left-after-selection';
    }
    return 'sticky-left';
  }

  _isStickyRight(column) {
    return column.sticky === 'right';
  }

  render() {
    const items = this.displayedItems;
    const cols = this.columns || [];
    const totalCols = (cols.length || 1) + (this.selectable ? 1 : 0);

    return html`
      <div class="table-container ${this.striped ? 'striped' : ''}">
        <table>
          <thead>
            <tr>
              ${this.selectable ? this._renderSelectionHeaderCell() : ''}
              ${cols.map((col, colIndex) => this._renderHeaderCell(col, colIndex))}
            </tr>
          </thead>
          <tbody>
            ${items.length === 0
              ? html`
                  <tr class="empty-row">
                    <td class="empty-cell" colspan="${totalCols}" data-label="">
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

  _renderSelectionHeaderCell() {
    const isSticky = this.stickyFirstColumn;
    const hasShadow = !this.columns.some((col, idx) => (col.sticky === true || col.sticky === 'left' || (this.stickyFirstColumn && idx === 0)));
    const stickyClass = isSticky ? `sticky-left ${hasShadow ? 'has-shadow' : ''}` : '';

    return html`
      <th class="selection-cell ${stickyClass}" aria-label="Select"></th>
    `;
  }

  _renderHeaderCell(column, colIndex) {
    const isSorted = this.sortField === column.field && !!this.sortDirection;
    const alignClass = column.align ? `align-${column.align}` : 'align-left';
    const sortableClass = column.sortable ? 'sortable' : '';
    const stickyLeftClass = this._getStickyLeftClass(column, colIndex);
    const stickyRightClass = this._isStickyRight(column) ? 'sticky-right' : '';
    const stickyClass = `${stickyLeftClass} ${stickyRightClass}`.trim();
    const styleWidth = column.width ? `width: ${column.width};` : '';

    return html`
      <th
        class="${alignClass} ${sortableClass} ${stickyClass}"
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
    let rowClassName = '';
    if (typeof this.rowClass === 'function') {
      rowClassName = this.rowClass(row, rowIndex) || '';
    }

    return html`
      <tr class="${rowClassName}" @click=${(e) => this._handleRowClick(row, rowIndex, e)}>
        ${this.selectable ? this._renderSelectionCell(row, rowIndex) : ''}
        ${columns.map((col, colIndex) => this._renderCell(row, rowIndex, col, colIndex))}
      </tr>
    `;
  }

  _renderSelectionCell(row, rowIndex) {
    const isSticky = this.stickyFirstColumn;
    const hasShadow = !this.columns.some((col, idx) => (col.sticky === true || col.sticky === 'left' || (this.stickyFirstColumn && idx === 0)));
    const stickyClass = isSticky ? `sticky-left ${hasShadow ? 'has-shadow' : ''}` : '';
    const isSelected = this._isRowSelected(row);

    return html`
      <td
        class="selection-cell ${stickyClass}"
        data-label=""
        @click=${(e) => e.stopPropagation()}
      >
        <dile-checkbox
          ?checked=${isSelected}
          @dile-checkbox-changed=${(e) => this._handleCheckboxChange(row, rowIndex, e)}
        ></dile-checkbox>
      </td>
    `;
  }

  _handleCheckboxChange(row, rowIndex, event) {
    const itemId = this._getRowId(row);
    const checked = Boolean(event.detail.checked);

    this.dispatchEvent(
      new CustomEvent('item-checkbox-changed', {
        bubbles: true,
        composed: true,
        detail: {
          checked,
          itemId,
          row,
          index: rowIndex,
        },
      })
    );

    this.dispatchEvent(
      new CustomEvent('dile-data-grid-item-selected', {
        bubbles: true,
        composed: true,
        detail: {
          checked,
          itemId,
          row,
          index: rowIndex,
        },
      })
    );
  }

  _renderCell(row, rowIndex, column, colIndex) {
    const alignClass = column.align ? `align-${column.align}` : 'align-left';
    const hideOnCardClass = column.hideOnCard ? 'hide-on-card' : '';
    const noCardLabelClass = column.hideCardLabel ? 'no-card-label' : '';
    const stickyLeftClass = this._getStickyLeftClass(column, colIndex);
    const stickyRightClass = this._isStickyRight(column) ? 'sticky-right' : '';
    const stickyClass = `${stickyLeftClass} ${stickyRightClass}`.trim();
    const label = column.hideCardLabel ? '' : (column.header || column.field || '');

    let content;
    if (typeof column.render === 'function') {
      content = column.render(row, rowIndex, column);
    } else if (column.field && row && row[column.field] !== undefined) {
      content = row[column.field];
    } else {
      content = '';
    }

    return html`
      <td
        class="${alignClass} ${hideOnCardClass} ${noCardLabelClass} ${stickyClass}"
        data-label="${label}"
      >
        ${content}
      </td>
    `;
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
