import { css } from "lit";
import { DileCrudItemDelete } from "../../item-delete/src/DileCrudItemDelete.js";

const OPERATION_ITEM_MISSING_ERROR = 'Please provide the element id to restore';

export class DileCrudItemRestore extends DileCrudItemDelete {
  static styles = [
    super.styles,
    css`
      :host {
          --dile-confirm-accept-button-color: var(--neutral-icon-color, #337aad);
      }
    `
  ];

  static get properties() {
    return {
      urlSufix: { type: String }
    };
  }

  constructor() {
    super();
    this.successEventName = 'restore-success';
    this.errorEventName = 'restore-error';
    this.method = 'post';
    this.urlSufix = 'restore';
  }

  computeUrl(endpoint, relatedId) {
    return `${endpoint}/${relatedId}/${this.urlSufix}`
  }

  restore(itemId) {
    this.delete(itemId);
  }

  cancelLabelComputed(label, translations) {
    return label ? label : translations?.cancel_label ? translations.cancel_label : 'Cancel';
  }

  acceptLabelComputed(label, translations) {
    return label ? label : translations?.accept_label ? translations.accept_label : 'Accept';
  }

  confirmMessageComputed(message, translations) {
    return message ? message : translations?.restore_confirm_message ? translations.restore_confirm_message : 'Are you sure?';
  }
}
