import { LitElement, html, css } from 'lit';
import '@dile/ui/components/checkbox/checkbox.js';
import '@dile/ui/components/button/button.js';
import '@dile/iconlib/material-icons/edit.js';
import '@dile/iconlib/material-icons/delete.js';
import '@dile/iconlib/material-icons/restore-from-trash.js';

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
        dile-button.action-button {
            --dile-button-background-color: transparent;
            --dile-button-border-color: transparent;
            --dile-button-hover-background-color: var(--dile-neutral-color, transparent);
            --dile-button-hover-border-color: transparent;
            --dile-button-icon-color: var(--edit-icon-color, var(--dile-alert-neutral-color, #2889a7));
            --dile-button-padding-y: 0.25rem;
            --dile-button-padding-x: 0.25rem;
            --dile-button-icon-size: 24px;
        }
        dile-button.delete {
            --dile-button-icon-color: var(--delete-icon-color, var(--dile-danger-color, #e33));
        }
        dile-button.restore {
            --dile-button-icon-color: var(--restore-icon-color, var(--dile-alert-success-color, #00900f));
        }
        @media(min-width: 550px) {
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

  }

  render() {
    return html`
        <section>
            ${this.hideCheckboxSelection ? '' : html`
                <dile-checkbox ?checked="${this.includes(this.actionIds, this.itemId)}" @dile-checkbox-changed=${this.checkboxChanged}></dile-checkbox>
            `}
            <main>
                <slot></slot>
            </main>
            <div class="actions">
                ${this.isDeleted
                  ? this.restoreActionsTemplate
                  : this.regularActionsTemplate
                }
            </div>
        </section>
    `;
  }

  get regularActionsTemplate() {
    return html`
      ${this.disableEdit
        ? ''
        : html`<dile-button class="action-button" icon="material.edit" label="Edit" @click=${this.editClick}></dile-button>`
      }
      ${this.disableDelete
        ? ''
        : html`<dile-button class="action-button delete" icon="material.delete" label="Delete" @click=${this.deleteClick}></dile-button>`
      }
    `
  }

  get restoreActionsTemplate() {
    return html`
      ${this.disableRestore
        ? ''
        : html`<dile-button class="action-button restore" icon="material.restore-from-trash" label="Restore" @click=${this.restoreClick}></dile-button>`
      }
    `
  }

  includes(actionIds, itemId) {
    const stringIds = actionIds.map(String);
    return stringIds.includes(String(itemId));
  }

  checkboxChanged(e) {
    this.dispatchEvent(new CustomEvent('item-checkbox-changed', {
      bubbles: true,
      composed: true,
      detail: {
        checked: e.detail.checked,
        itemId: this.itemId
      }
    }));
  }

  _dispatchItemEvent(eventName) {
    this.dispatchEvent(new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail: {
        item: this.item,
        itemId: this.itemId,
      }
    }));
  }

  editClick() {
    this._dispatchItemEvent('crud-item-edit');
  }

  deleteClick() {
    this._dispatchItemEvent('crud-item-delete');
  }

  restoreClick() {
    this._dispatchItemEvent('crud-item-restore');
  }
}