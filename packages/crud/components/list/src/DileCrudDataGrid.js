import { LitElement, html, css } from 'lit';
import '@dile/ui/components/data-grid/data-grid.js';
import { DileCrudItemActions } from './DileCrudItemActions.js';
import '../crud-item-actions.js';

export class DileCrudDataGrid extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      dile-data-grid {
        margin-top: var(--dile-crud-data-grid-margin-top: 0.25rem);
      }
    `
  ];

  static get properties() {
    return {
      items: { type: Array },
      selectedIds: { type: Array },
      config: { type: Object },
      sort: { type: Object },
    };
  }

  constructor() {
    super();
    this.items = [];
    this.selectedIds = [];
    this.config = null;
    this.sort = null;
  }

  get columns() {
    const configuredCols = this.config?.grid?.columns || [];
    const cols = [...configuredCols];

    const hideActions = Boolean(this.config?.grid?.hideActionsColumn);

    if (!hideActions && DileCrudItemActions.hasActions(this.config)) {
      const customActionsHeader = this.config?.grid?.actionsColumnHeader || this.config?.labels?.actionsHeader || 'Actions';
      const customActionsWidth = this.config?.grid?.actionsColumnWidth || '110px';
      const customActionsAlign = this.config?.grid?.actionsColumnAlign || 'right';
      const customActionsSticky = this.config?.grid?.actionsColumnSticky;

      cols.push({
        header: customActionsHeader,
        align: customActionsAlign,
        width: customActionsWidth,
        hideCardLabel: true,
        sticky: customActionsSticky,
        render: (item) => html`
          <dile-crud-item-actions
            .item=${item}
            .config=${this.config}
          ></dile-crud-item-actions>
        `,
      });
    }

    return cols;
  }

  get computeRowId() {
    const computeItemId = this.config?.computeItemId;
    if (typeof computeItemId !== 'function') {
      return null;
    }
    return (row) => computeItemId(row);
  }

  get rowClass() {
    return (row) => (row?.deleted_at ? 'is-deleted' : '');
  }

  render() {
    const gridConfig = this.config?.grid || {};

    return html`
      <dile-data-grid
        .items=${this.items}
        .columns=${this.columns}
        .selectedIds=${this.selectedIds}
        .computeRowId=${this.computeRowId}
        .rowClass=${this.rowClass}
        .sortField=${this.sort?.sortField || ''}
        .sortDirection=${this.sort?.sortDirection || ''}
        ?selectable=${gridConfig.selectable !== undefined ? gridConfig.selectable : !this.config?.customization?.hideCheckboxSelection}
        ?sticky-first-column=${gridConfig.stickyFirstColumn !== undefined ? gridConfig.stickyFirstColumn : true}
        ?striped=${gridConfig.striped !== undefined ? gridConfig.striped : true}
        responsive-mode=${gridConfig.responsiveMode || 'auto'}
        empty-message=${gridConfig.emptyMessage || 'No data available'}
        sort-mode="external"
      ></dile-data-grid>
    `;
  }
}
