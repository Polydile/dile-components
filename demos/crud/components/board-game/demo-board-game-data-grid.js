import { LitElement, html, css } from 'lit';
import '@dile/ui/components/data-grid/data-grid.js';
import { DileCrudItemActions } from '@dile/crud/components/list/src/DileCrudItemActions.js';
import '@dile/crud/components/list/crud-item-actions.js';

export class DemoBoardGameDataGrid extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      dile-data-grid::part(year-cell) {
        font-weight: 500;
        color: #555;
      }
      dile-data-grid::part(essential-badge) {
        display: inline-block;
        padding: 0.2rem 0.5rem;
        border-radius: 12px;
        background-color: #fef3c7;
        color: #92400e;
        font-size: 0.8rem;
        font-weight: 600;
      }
    `
  ];

  static get properties() {
    return {
      items: { type: Array },
      selectedIds: { type: Array },
      config: { type: Object },
    };
  }

  constructor() {
    super();
    this.items = [];
    this.selectedIds = [];
    this.config = null;
  }

  get columns() {
    const cols = [
      {
        field: 'id',
        header: 'ID',
        width: '70px',
        align: 'center',
        sortable: true,
      },
      {
        field: 'name',
        header: 'Game Title',
        sortable: true,
      },
      {
        field: 'year',
        header: 'Year',
        width: '90px',
        align: 'center',
        sortable: true,
        render: (game) => html`<span part="year-cell">${game.year || '-'}</span>`,
      },
      {
        field: 'essential',
        header: 'Essential',
        width: '110px',
        align: 'center',
        render: (game) =>
          game.essential
            ? html`<span part="essential-badge">⭐ Essential</span>`
            : html`<span>-</span>`,
      },
    ];

    if (DileCrudItemActions.hasActions(this.config)) {
      cols.push({
        header: 'Actions',
        align: 'right',
        width: '110px',
        hideCardLabel: true,
        render: (game) => html`
          <dile-crud-item-actions
            .item=${game}
            .config=${this.config}
          ></dile-crud-item-actions>
        `,
      });
    }

    return cols;
  }

  render() {
    return html`
      <dile-data-grid
        .items=${this.items}
        .columns=${this.columns}
        .selectedIds=${this.selectedIds}
        ?selectable=${!this.config?.customization?.hideCheckboxSelection}
        sticky-first-column
        striped
      ></dile-data-grid>
    `;
  }
}

if (!customElements.get('demo-board-game-data-grid')) {
  customElements.define('demo-board-game-data-grid', DemoBoardGameDataGrid);
}
