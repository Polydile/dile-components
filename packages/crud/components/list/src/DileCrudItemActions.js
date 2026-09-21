import { LitElement, html, css, nothing } from 'lit';
import '@dile/ui/components/button/button.js';
import '@dile/iconlib/material-icons/edit.js';
import '@dile/iconlib/material-icons/delete.js';
import '@dile/iconlib/material-icons/restore-from-trash.js';

export class DileCrudItemActions extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: var(--dile-crud-item-actions-gap, 0.25rem);
      }
      dile-button.action-button {
        --dile-button-background-color: var(--dile-crud-list-item-action-button-background-color, transparent);
        --dile-button-border-color: var(--dile-crud-list-item-action-button-border-color, transparent);
        --dile-button-hover-background-color: var(--dile-crud-list-item-action-button-hover-background-color, var(--dile-neutral-color, #f1f5f9));
        --dile-button-hover-border-color: var(--dile-crud-list-item-action-button-hover-border-color, transparent);
        --dile-button-padding-y: var(--dile-crud-list-item-action-button-padding-y, 0.25rem);
        --dile-button-padding-x: var(--dile-crud-list-item-action-button-padding-x, 0.25rem);
        --dile-button-icon-size: var(--dile-crud-list-item-action-button-icon-size, 24px);
        --dile-button-border-radius: var(--dile-crud-list-item-action-button-border-radius, 2rem);
      }
      dile-button.action-button.edit {
        --dile-button-icon-color: var(--edit-icon-color, var(--dile-alert-neutral-color, #0c7595));
        --dile-button-icon-hover-color: var(--dile-crud-list-item-edit-icon-hover-color, var(--edit-icon-color, var(--dile-alert-neutral-color, #2889a7)));
      }
      dile-button.action-button.delete {
        --dile-button-icon-color: var(--delete-icon-color, var(--dile-danger-color, #e33));
        --dile-button-icon-hover-color: var(--dile-crud-list-item-delete-icon-hover-color, var(--delete-icon-color, var(--dile-danger-color, #e33)));
      }
      dile-button.action-button.restore {
        --dile-button-icon-color: var(--restore-icon-color, var(--dile-alert-success-color, #00900f));
        --dile-button-icon-hover-color: var(--dile-crud-list-item-restore-icon-hover-color, var(--restore-icon-color, var(--dile-alert-success-color, #00900f)));
      }
    `
  ];

  static get properties() {
    return {
      item: { type: Object },
      itemId: { type: String },
      config: { type: Object },
      disableEdit: { type: Boolean },
      disableDelete: { type: Boolean },
      disableRestore: { type: Boolean },
      isDeleted: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.config = null;
    this.disableEdit = false;
    this.disableDelete = false;
    this.disableRestore = false;
    this.isDeleted = false;
  }

  static hasActions(config) {
    if (!config) {
      return true;
    }
    if (config.customization?.disableListActions) {
      return false;
    }
    const editDisabled = Boolean(config.customization?.disableEdit);
    const deleteDisabled = Boolean(config.customization?.disableDelete);
    const restoreDisabled = Boolean(config.customization?.disableRestore);

    return !(editDisabled && deleteDisabled && restoreDisabled);
  }

  get computedIsDeleted() {
    if (this.isDeleted) {
      return true;
    }
    return Boolean(this.item?.deleted_at);
  }

  get computedItemId() {
    if (this.itemId !== undefined && this.itemId !== null && this.itemId !== '') {
      return this.itemId;
    }
    if (this.config?.computeItemId && typeof this.config.computeItemId === 'function' && this.item) {
      return this.config.computeItemId(this.item);
    }
    return this.item?.id;
  }

  get isEditable() {
    if (this.disableEdit) {
      return false;
    }
    if (this.config) {
      if (this.config.customization?.disableListActions || this.config.customization?.disableEdit) {
        return false;
      }
      if (typeof this.config.isItemEditable === 'function' && this.item) {
        return this.config.isItemEditable(this.item);
      }
    }
    return true;
  }

  get isDeletable() {
    if (this.disableDelete) {
      return false;
    }
    if (this.config) {
      if (this.config.customization?.disableListActions || this.config.customization?.disableDelete) {
        return false;
      }
      if (typeof this.config.isItemDeletable === 'function' && this.item) {
        return this.config.isItemDeletable(this.item);
      }
    }
    return true;
  }

  get isRestorable() {
    if (this.disableRestore) {
      return false;
    }
    if (this.config?.customization?.disableListActions || this.config?.customization?.disableRestore) {
      return false;
    }
    return true;
  }

  render() {
    return this.computedIsDeleted ? this.restoreActionsTemplate : this.regularActionsTemplate;
  }

  get regularActionsTemplate() {
    const showEdit = this.isEditable;
    const showDelete = this.isDeletable;

    if (!showEdit && !showDelete) {
      return nothing;
    }

    return html`
      ${showEdit
        ? html`<dile-button class="action-button edit" icon="material.edit" label="Edit" @click=${this.editClick}></dile-button>`
        : nothing
      }
      ${showDelete
        ? html`<dile-button class="action-button delete" icon="material.delete" label="Delete" @click=${this.deleteClick}></dile-button>`
        : nothing
      }
    `;
  }

  get restoreActionsTemplate() {
    if (!this.isRestorable) {
      return nothing;
    }

    return html`
      <dile-button class="action-button restore" icon="material.restore-from-trash" label="Restore" @click=${this.restoreClick}></dile-button>
    `;
  }

  _dispatchItemEvent(eventName) {
    this.dispatchEvent(new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail: {
        item: this.item,
        itemId: this.computedItemId,
      }
    }));
  }

  editClick(e) {
    e?.stopPropagation();
    this._dispatchItemEvent('crud-item-edit');
  }

  deleteClick(e) {
    e?.stopPropagation();
    this._dispatchItemEvent('crud-item-delete');
  }

  restoreClick(e) {
    e?.stopPropagation();
    this._dispatchItemEvent('crud-item-restore');
  }
}
