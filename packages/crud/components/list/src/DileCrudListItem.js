import { LitElement, html, css } from 'lit';
import '@dile/ui/components/checkbox/checkbox';
import '@dile/ui/components/icon/icon';
import { deleteIcon, editIcon } from '@dile/icons';

export class DileCrudListItem extends LitElement {
  static styles = [
    css`
        :host {
            display: block;
            max-width: 100%;
            width: 100%;
        }
        section {
            max-width: 100%;
            overflow: hidden;
            display: flex;
            align-items: center;
            padding: 0.5rem 0.5rem;
            border-bottom: 1px solid #ddd;
        }
        dile-checkbox {
            margin-right: 0.5rem;
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
            --dile-icon-size: 24px;
            --dile-icon-color: var(--edit-icon-color, #33ad67);
        }
        dile-icon {
            cursor: pointer;
            margin: 0 0.2rem;
        }
        dile-icon.delete {
            --dile-icon-color: var(--delete-icon-color, #e33);
        }
        @media(min-width: 550px) {
            section {
                padding: 0.5rem 1rem;
            }
        }
    `
  ];

  static get properties() {
    return {
      itemId: { type: Number },
      actionIds: { type: Array },
      disableEdit: { type: Boolean },
      disableDelete: { type: Boolean },
      /** Hide checkboxes on the item list */
      hideCheckboxSelection: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.actionIds = [];
    this.disableEdit = false;
    this.disableDelete = false;
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
                ${this.disableEdit
        ? ''
        : html`<dile-icon .icon="${editIcon}" @click=${this.editClick}></dile-icon>`
      }
                ${this.disableDelete
        ? ''
        : html`<dile-icon class="delete" .icon="${deleteIcon}" @click=${this.deleteClick}></dile-icon>`
      }
            </div>
        </section>
    `;
  }

  includes(actionIds, itemId) {
    //console.log('includes', actionIds,  typeof itemId,  itemId, actionIds.includes(itemId));
    return actionIds.includes(itemId);
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

  editClick() {
    this.dispatchEvent(new CustomEvent('crud-item-edit', {
      bubbles: true,
      composed: true,
      detail: {
        itemId: this.itemId
      }
    }));
  }

  deleteClick() {
    this.dispatchEvent(new CustomEvent('crud-item-delete', {
      bubbles: true,
      composed: true,
      detail: {
        itemId: this.itemId
      }
    }));
  }
}