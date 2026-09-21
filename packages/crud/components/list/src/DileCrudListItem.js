import { LitElement, html, css, nothing } from 'lit';
import '@dile/ui/components/checkbox/checkbox.js';
import '../crud-item-actions.js';

export class DileCrudListItem extends LitElement {
  static styles = [
    css`
      :host {
        display: var(--dile-crud-list-item-display, block);
        max-width: var(--dile-crud-list-item-max-width, 100%);
        width: var(--dile-crud-list-item-width, 100%);
      }
      section {
        max-width: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
        padding: var(--dile-crud-list-item-padding, 0.5rem 0.5rem);
        border-bottom: var(--dile-crud-list-item-line-separator, 1px solid #ddd);
      }
      dile-checkbox {
        margin-right: 0.5rem;
        --dile-checkbox-unchecked-color: #888;
      }
      main {
        flex-grow: 1;
        overflow: hidden;
      }
      .actions {
        margin-left: 0.5rem;
        display: flex;
        align-items: center;
        text-align: right;
      }
      @media (min-width: 550px) {
        section {
          padding: var(--dile-crud-list-item-padding, 0.5rem 1rem);
        }
      }
    `
  ];

  static get properties() {
    return {
      item: { type: Object },
      itemId: { type: String },
      actionIds: { type: Array },
      disableEdit: { type: Boolean },
      disableDelete: { type: Boolean },
      disableRestore: { type: Boolean },
      /** Hide checkboxes on the item list */
      hideCheckboxSelection: { type: Boolean },
      isDeleted: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.actionIds = [];
    this.disableEdit = false;
    this.disableDelete = false;
    this.disableRestore = false;
    this.hideCheckboxSelection = false;
    this.isDeleted = false;
  }

  get hasActions() {
    if (this.isDeleted) {
      return !this.disableRestore;
    }
    return !this.disableEdit || !this.disableDelete;
  }

  render() {
    return html`
      <section>
        ${this.hideCheckboxSelection
          ? ''
          : html`
              <dile-checkbox
                ?checked="${this.includes(this.actionIds, this.itemId)}"
                @dile-checkbox-changed=${this.checkboxChanged}
              ></dile-checkbox>
            `}
        <main>
          <slot></slot>
        </main>
        ${this.hasActions
          ? html`
              <div class="actions">
                <dile-crud-item-actions
                  .item=${this.item}
                  itemId="${this.itemId}"
                  ?disableEdit=${this.disableEdit}
                  ?disableDelete=${this.disableDelete}
                  ?disableRestore=${this.disableRestore}
                  ?isDeleted=${this.isDeleted}
                ></dile-crud-item-actions>
              </div>
            `
          : nothing
        }
      </section>
    `;
  }

  includes(actionIds, itemId) {
    const stringIds = actionIds.map(String);
    return stringIds.includes(String(itemId));
  }

  checkboxChanged(e) {
    this.dispatchEvent(
      new CustomEvent('item-checkbox-changed', {
        bubbles: true,
        composed: true,
        detail: {
          checked: e.detail.checked,
          itemId: this.itemId,
        },
      })
    );
  }
}
